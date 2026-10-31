
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os
from datetime import date
import holidays

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "modelo_tpdm_occidente.joblib")
COLS_PATH = os.path.join(BASE_DIR, "columnas_modelo.joblib")

try:
    modelo = joblib.load(MODEL_PATH)
    columnas = joblib.load(COLS_PATH)
except:
    modelo = None
    columnas = ['cant_festivos_mes','temporada_alta','anio','mes','categoria_tarifa_I','categoria_tarifa_II','categoria_tarifa_IE','categoria_tarifa_IIE']

co_holidays = holidays.CO(years=[2024,2025,2026,2027])

class Mensual(BaseModel):
    anio: int
    mes: int
    cant_festivos_mes: int
    temporada_alta: int

# Factores calibrados INVIAS Occidente - promedio = 1.0
FACTORES_DIA = {0:0.55, 1:0.58, 2:0.60, 3:0.75, 4:1.35, 5:2.10, 6:1.95}
FACTOR_FESTIVO = 2.85
AVG_FACTOR = sum(FACTORES_DIA.values())/7  # 1.125

def predecir_categoria(anio, mes, festivos, temp_alta, categoria):
    row = {
        'cant_festivos_mes': festivos,
        'temporada_alta': temp_alta,
        'anio': anio,
        'mes': mes,
        'categoria_tarifa_I': 1 if categoria == 'I' else 0,
        'categoria_tarifa_II': 1 if categoria == 'II' else 0,
        'categoria_tarifa_IE': 1 if categoria == 'IE' else 0,
        'categoria_tarifa_IIE': 1 if categoria == 'IIE' else 0,
    }
    df = pd.DataFrame([row]).reindex(columns=columnas, fill_value=0)
    try:
        pred = float(modelo.predict(df)[0])
    except:
        fallback = {'I': 8889, 'II': 800, 'IE': 25, 'IIE': 20}
        pred = fallback.get(categoria, 100)
    return max(pred, 10)

def calcular_turistas(autos, buses_ii, buses_iie):
    buses_totales = (buses_ii * 0.20) + buses_iie
    c_publico = buses_totales * 25
    c_autos = autos * 2.3
    c_motos = autos * 0.35 * 1.2
    return (c_publico + c_autos + c_motos) * 0.82

@app.post("/predecir")
def predecir_mensual(d: Mensual):
    res = {cat: predecir_categoria(d.anio, d.mes, d.cant_festivos_mes, d.temporada_alta, cat) for cat in ['I','II','IE','IIE']}
    f_total = 0.75 + 0.84 + 0.60
    autos_fs = res['I'] * f_total
    buses_ii_fs = res['II'] * f_total
    buses_iie_fs = res['IIE'] * f_total
    total = calcular_turistas(autos_fs, buses_ii_fs, buses_iie_fs)
    return {
        "tpdm_mensual": res,
        "resumen_fin_semana": {
            "autos": int(autos_fs),
            "total_turistas": round(total,1),
            "santa_fe": round(total*0.57,1),
            "san_jeronimo": round(total*0.22,1),
            "sopetran": round(total*0.17,1),
            "demas": round(total*0.04,1),
        }
    }

@app.post("/predecir-diario")
def predecir_diario(fecha: str):
    d = date.fromisoformat(fecha)
    es_festivo = d in co_holidays
    dia_sem = d.weekday()
    factor = FACTOR_FESTIVO if es_festivo else FACTORES_DIA[dia_sem]
    temp_alta = 1 if d.month in [1,6,7,12] else 0
    
    # Base mensual
    base = predecir_mensual(Mensual(anio=d.year, mes=d.month, cant_festivos_mes=2, temporada_alta=temp_alta))
    
    # CORRECCION CLAVE: normalizar por promedio
    autos_dia = int(base["tpdm_mensual"]["I"] * (factor / AVG_FACTOR))
    turistas_transito = calcular_turistas(autos_dia, base["tpdm_mensual"]["II"]*factor/AVG_FACTOR/2.19, base["tpdm_mensual"]["IIE"]*factor/AVG_FACTOR/2.19)
    
    # Turistas que PERNOCTAN - factor realista por tipo de dia
    if es_festivo:
        pct_pernocta = 0.72
        tipo = "FESTIVO"
        color = "green"
    elif dia_sem >=5:
        pct_pernocta = 0.65
        tipo = "FIN DE SEMANA"
        color = "yellow"
    elif dia_sem == 4: # Viernes
        pct_pernocta = 0.55
        tipo = "VIERNES PRE-PUENTE"
        color = "yellow"
    else:
        pct_pernocta = 0.35
        tipo = "DIA LABORAL"
        color = "gray"

    turistas_pernoctan = int(turistas_transito * pct_pernocta)

    return {
        "fecha": fecha,
        "dia": ["LUNES","MARTES","MIERCOLES","JUEVES","VIERNES","SABADO","DOMINGO"][dia_sem],
        "es_festivo": es_festivo,
        "tipo_dia": tipo,
        "color_semaforo": color,
        "factor": round(factor / AVG_FACTOR,2),
        "tpdm_mensual": base["tpdm_mensual"],
        "prediccion_tpdm": base["tpdm_mensual"]["I"],
        "autos_dia": autos_dia,
        "turistas_transito_total": round(turistas_transito,1),
        "turistas_dia": turistas_pernoctan, # para compatibilidad
        "turistas_pernoctan": turistas_pernoctan,
        "pct_pernocta": pct_pernocta,
        "resumen_fin_semana": {
            "autos": int(base["resumen_fin_semana"]["autos"]),
            "total_turistas": base["resumen_fin_semana"]["total_turistas"],
            "santa_fe": round(turistas_pernoctan*0.57,1) if not es_festivo and dia_sem<5 else base["resumen_fin_semana"]["santa_fe"],
            "san_jeronimo": round(turistas_pernoctan*0.22,1) if not es_festivo and dia_sem<5 else base["resumen_fin_semana"]["san_jeronimo"],
            "sopetran": round(turistas_pernoctan*0.17,1) if not es_festivo and dia_sem<5 else base["resumen_fin_semana"]["sopetran"],
            "demas": round(turistas_pernoctan*0.04,1) if not es_festivo and dia_sem<5 else base["resumen_fin_semana"]["demas"],
            "total_turistas": turistas_pernoctan if not es_festivo and dia_sem<5 else base["resumen_fin_semana"]["total_turistas"]
        },
        "resumen_diario_real": {
            "autos": autos_dia,
            "transito_total": round(turistas_transito,1),
            "pernoctan": turistas_pernoctan,
            "santa_fe": round(turistas_pernoctan*0.57,1),
            "san_jeronimo": round(turistas_pernoctan*0.22,1),
            "sopetran": round(turistas_pernoctan*0.17,1),
        }
    }
