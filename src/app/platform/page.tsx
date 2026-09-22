'use client';

import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Network, 
  Database, 
  Cpu, 
  Terminal, 
  CheckCircle2, 
  RotateCw,
  ArrowRight,
  MapPin
} from 'lucide-react';

/* =========================================================================
   TIPOS E INTERFACES
   ========================================================================= */

interface GraphNodeData {
  id: string;
  label: string;
  module: 'FASTAPI' | 'POSTGRES' | 'NEO4J' | 'MACHINE_LEARNING' | 'SCIKIT_LEARN' | 'ONTOLOGIA' | 'CORE' | 'NextJS';
  color: string;
  size: number;
  connections: string[];
  properties: Record<string, string | number>;
  x?: number;
  y?: number;
  z?: number;
}

interface ModuloPlataforma {
  id: string;
  nombre: string;
  subtitulo: string;
  tag: 'FASTAPI' | 'POSTGRES' | 'NEO4J' | 'MACHINE_LEARNING' | 'SCIKIT_LEARN' | 'ONTOLOGIA' | 'NextJS';
  color: string;
  descripcion: string;
  capacidades: string[];
  métricaRendimiento: string;
  nivelAlerta: 'INFO' | 'ALERTA' | 'CRITICO';
  ubicacion: string;
  coordenadas: string;
  tiempo: string;
}

/* =========================================================================
   DATOS DEL GRAFO NEO4J (Colores Neón para el 3D)
   ========================================================================= */

const GRAPH_NODES: GraphNodeData[] = [
  { id: 'N0', label: 'Core Ontológico', module: 'CORE', color: '#00FFFF', size: 0.42, connections: ['N1', 'N2', 'N3', 'N4', 'N5', 'N6'], properties: { cluster: 'Ontology Engine', throughput: '28,500 ops/s', status: 'Optimal' } },
  { id: 'N1', label: 'FastAPI Backend', module: 'FASTAPI', color: '#00FF88', size: 0.32, connections: ['N7', 'N8'], properties: { framework: 'FastAPI 0.115', latencia: '12ms', workers: '4 Uvicorn' } },
  { id: 'N2', label: 'PostgreSQL', module: 'POSTGRES', color: '#3366FF', size: 0.32, connections: ['N9', 'N10'], properties: { version: 'PostgreSQL 16', extensiones: 'PostGIS, pgvector', conexiones: '200 max' } },
  { id: 'N3', label: 'Neo4j Graph', module: 'NEO4J', color: '#00FFFF', size: 0.32, connections: ['N11', 'N12'], properties: { version: 'Neo4j v5.12', query: 'Cypher', nodos: '1.2M rels' } },
  { id: 'N4', label: 'Machine Learning', module: 'MACHINE_LEARNING', color: '#FF00FF', size: 0.32, connections: ['N13', 'N14'], properties: { modelos: 'Random Forest, XGBoost', accuracy: '96.4%', pipeline: 'MLflow' } },
  { id: 'N5', label: 'Scikit-Learn', module: 'SCIKIT_LEARN', color: '#FFAA00', size: 0.32, connections: ['N15', 'N16'], properties: { version: 'scikit-learn 1.5', algoritmos: 'SVM, KMeans, PCA', preprocesamiento: 'Pipelines' } },
  { id: 'N6', label: 'Ontología Computacional', module: 'ONTOLOGIA', color: '#FF0055', size: 0.32, connections: ['N17', 'N18'], properties: { formato: 'OWL 2 / RDF', razonador: 'HermiT', tripletas: '450K' } },
  { id: 'N19', label: 'NextJs', module: 'NextJS', color: '#F4A955', size: 0.32, connections: ['N20', 'N21'], properties: { version: 'Next.js 14', render: 'SSR + SSG', framework: 'React' } },
  
  { id: 'N7', label: 'Endpoints REST', module: 'FASTAPI', color: '#00FF88', size: 0.20, connections: [], properties: { rutas: 48, async: 'Sí', docs: 'Swagger UI' } },
  { id: 'N8', label: 'Pydantic Models', module: 'FASTAPI', color: '#00FF88', size: 0.20, connections: [], properties: { validacion: 'Estricta', schemas: 32 } },
  { id: 'N9', label: 'PostGIS Spatial', module: 'POSTGRES', color: '#3366FF', size: 0.20, connections: [], properties: { geometrias: 'MultiPolygon', srid: 4326 } },
  { id: 'N10', label: 'pgvector Search', module: 'POSTGRES', color: '#3366FF', size: 0.20, connections: [], properties: { dimensiones: 1536, index: 'HNSW' } },
  { id: 'N11', label: 'APOC Procedures', module: 'NEO4J', color: '#00FFFF', size: 0.20, connections: [], properties: { procedures: 120, spatial: 'Activo' } },
  { id: 'N12', label: 'Graph Data Science', module: 'NEO4J', color: '#00FFFF', size: 0.20, connections: [], properties: { algoritmos: 'PageRank, Louvain', embeddings: 'FastRP' } },
  { id: 'N13', label: 'Pipeline MLflow', module: 'MACHINE_LEARNING', color: '#FF00FF', size: 0.20, connections: [], properties: { experimentos: 48, modelos: 12 } },
  { id: 'N14', label: 'Inferencia Tiempo Real', module: 'MACHINE_LEARNING', color: '#FF00FF', size: 0.20, connections: [], properties: { latencia: '45ms', batch: 'Streaming' } },
  { id: 'N15', label: 'Modelos Supervisados', module: 'SCIKIT_LEARN', color: '#FFAA00', size: 0.20, connections: [], properties: { regresion: 'Ridge, Lasso', clasificacion: 'SVC, RF' } },
  { id: 'N16', label: 'Clustering & PCA', module: 'SCIKIT_LEARN', color: '#FFAA00', size: 0.20, connections: [], properties: { clusters: 8, varianza: '92%' } },
  { id: 'N17', label: 'Razonamiento Semántico', module: 'ONTOLOGIA', color: '#FF0055', size: 0.20, connections: [], properties: { inferencias: 'DL Reasoner', consistencia: 'OK' } },
  { id: 'N18', label: 'Tripletas RDF', module: 'ONTOLOGIA', color: '#FF0055', size: 0.20, connections: [], properties: { sujetos: '120K', predicados: '45K' } },
  { id: 'N20', label: 'App Router', module: 'NextJS', color: '#F4A955', size: 0.20, connections: [], properties: { rutas: 24, layout: 'Server Components' } },
  { id: 'N21', label: 'Tailwind CSS', module: 'NextJS', color: '#F4A955', size: 0.20, connections: [], properties: { utilidades: 'Full', darkMode: 'Class' } },
];

const MODULOS: ModuloPlataforma[] = [
  {
    id: 'STK-01',
    nombre: 'FASTAPI BACKEND',
    subtitulo: 'API REST ASÍNCRONA DE ALTO RENDIMIENTO',
    tag: 'FASTAPI',
    color: '#00FF88',
    descripcion: 'Framework web moderno y rápido para construir APIs con Python 3.12+, basado en Starlette y Pydantic para validación estricta de datos.',
    capacidades: ['Endpoints asíncronos con Uvicorn', 'Validación automática con Pydantic', 'Documentación OpenAPI/Swagger'],
    métricaRendimiento: 'Latencia: 12ms P95',
    nivelAlerta: 'INFO',
    ubicacion: 'BACKEND API',
    coordenadas: 'N/A',
    tiempo: 'HACE 1 MIN'
  },
  {
    id: 'STK-02',
    nombre: 'POSTGRESQL',
    subtitulo: 'BASE DE DATOS RELACIONAL CON EXTENSIONES ESPACIALES',
    tag: 'POSTGRES',
    color: '#3366FF',
    descripcion: 'Sistema de gestión de bases de datos relacional open-source con soporte para datos espaciales (PostGIS) y búsqueda vectorial (pgvector).',
    capacidades: ['Consultas espaciales con PostGIS', 'Búsqueda vectorial con pgvector', 'Índices GIN, GiST y HNSW'],
    métricaRendimiento: 'Conexiones: 200 max',
    nivelAlerta: 'INFO',
    ubicacion: 'BASE DE DATOS',
    coordenadas: 'N/A',
    tiempo: 'HACE 2 MIN'
  },
  {
    id: 'STK-03',
    nombre: 'NEO4J GRAPH',
    subtitulo: 'BASE DE DATOS DE GRAFOS PARA ONTOLOGÍAS',
    tag: 'NEO4J',
    color: '#00FFFF',
    descripcion: 'Base de datos nativa de grafos que almacena nodos y relaciones, ideal para modelar ontologías computacionales y conocimiento interconectado.',
    capacidades: ['Consultas Cypher de alta velocidad', 'Graph Data Science Library', 'Procedimientos APOC extendidos'],
    métricaRendimiento: 'Nodos: 1.2M relaciones',
    nivelAlerta: 'INFO',
    ubicacion: 'GRAFO DE CONOCIMIENTO',
    coordenadas: 'N/A',
    tiempo: 'HACE 3 MIN'
  },
  {
    id: 'STK-04',
    nombre: 'MACHINE LEARNING',
    subtitulo: 'PIPELINES DE ENTRENAMIENTO E INFERENCIA',
    tag: 'MACHINE_LEARNING',
    color: '#FF00FF',
    descripcion: 'Conjunto de técnicas y herramientas para entrenar, versionar y desplegar modelos predictivos en producción con MLflow.',
    capacidades: ['Entrenamiento con Random Forest / XGBoost', 'Versionado de modelos con MLflow', 'Inferencia en tiempo real por streaming'],
    métricaRendimiento: 'Accuracy: 96.4%',
    nivelAlerta: 'INFO',
    ubicacion: 'CLÚSTER ML',
    coordenadas: 'N/A',
    tiempo: 'HACE 4 MIN'
  },
  {
    id: 'STK-05',
    nombre: 'SCIKIT-LEARN',
    subtitulo: 'LIBRERÍA DE MACHINE LEARNING EN PYTHON',
    tag: 'SCIKIT_LEARN',
    color: '#FFAA00',
    descripcion: 'Librería fundamental para preprocesamiento, reducción de dimensionalidad y algoritmos supervisados/no supervisados.',
    capacidades: ['Preprocesamiento con Pipelines', 'Algoritmos SVM, KMeans, PCA', 'Validación cruzada y métricas'],
    métricaRendimiento: 'Varianza PCA: 92%',
    nivelAlerta: 'INFO',
    ubicacion: 'PIPELINE PYTHON',
    coordenadas: 'N/A',
    tiempo: 'HACE 5 MIN'
  },
  {
    id: 'STK-06',
    nombre: 'ONTOLOGÍA COMPUTACIONAL',
    subtitulo: 'MODELADO SEMÁNTICO Y RAZONAMIENTO',
    tag: 'ONTOLOGIA',
    color: '#FF0055',
    descripcion: 'Representación formal del conocimiento mediante OWL/RDF, con razonadores que permiten inferencia automática y consistencia lógica.',
    capacidades: ['Modelado en OWL 2 / RDF', 'Razonamiento con HermiT', 'Inferencia semántica automática'],
    métricaRendimiento: 'Tripletas: 450K',
    nivelAlerta: 'INFO',
    ubicacion: 'MOTOR ONTOLÓGICO',
    coordenadas: 'N/A',
    tiempo: 'HACE 6 MIN'
  },
  {
    id: 'STK-07',
    nombre: 'NEXT.JS',
    subtitulo: 'FRAMEWORK DE REACT PARA PRODUCCIÓN',
    tag: 'NextJS',
    color: '#F4A955',
    descripcion: 'Framework de React para renderizado del lado del servidor, generación estática y enrutamiento basado en archivos.',
    capacidades: ['App Router con Server Components', 'Renderizado SSR y SSG', 'Optimización automática de imágenes'],
    métricaRendimiento: 'LCP: 1.2s',
    nivelAlerta: 'INFO',
    ubicacion: 'FRONTEND',
    coordenadas: 'N/A',
    tiempo: 'HACE 7 MIN'
  }
];

/* =========================================================================
   TEXTURAS Y SPRITES (Three.js)
   ========================================================================= */

function createGlowTexture(colorStr: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, colorStr);
    gradient.addColorStop(0.2, colorStr);
    gradient.addColorStop(0.5, colorStr + '88');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createTextSprite(text: string, color: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(7, 7, 12, 0.9)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.roundRect(20, 20, 472, 88, 16);
    ctx.fill();
    ctx.stroke();
    ctx.shadowColor = color;
    ctx.shadowBlur = 30;
    ctx.font = 'Bold 36px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text.toUpperCase(), 256, 64);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending
  });

  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(1.6, 0.4, 1);
  return sprite;
}

/* =========================================================================
   COMPONENTE PRINCIPAL
   ========================================================================= */

export default function PlataformaPage() {
  const [moduloActivo, setModuloActivo] = useState<ModuloPlataforma>(MODULOS[0]);
  const [selectedNode, setSelectedNode] = useState<GraphNodeData>(GRAPH_NODES[0]);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const autoRotateRef = useRef<boolean>(autoRotate);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    const nodeMap = new Map<string, THREE.Vector3>();
    const nodeMeshes: THREE.Mesh[] = [];
    const sphereGeo = new THREE.SphereGeometry(1, 32, 32);

    GRAPH_NODES.forEach((node, idx) => {
      let vec: THREE.Vector3;
      if (idx === 0) {
        vec = new THREE.Vector3(0, 0, 0);
      } else {
        const phi = Math.acos(-1 + (2 * idx) / GRAPH_NODES.length);
        const theta = Math.sqrt(GRAPH_NODES.length * Math.PI) * phi;
        const radius = 3.2 + (idx % 2) * 0.5;
        vec = new THREE.Vector3(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        );
      }
      node.x = vec.x;
      node.y = vec.y;
      node.z = vec.z;
      nodeMap.set(node.id, vec);

      const nodeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(node.color),
        emissive: new THREE.Color(node.color),
        emissiveIntensity: 8.0,
        roughness: 0.0,
        metalness: 0.1,
        toneMapped: false
      });

      const mesh = new THREE.Mesh(sphereGeo, nodeMat);
      mesh.position.copy(vec);
      mesh.scale.setScalar(node.size);
      mesh.userData = node;

      const glowTexture = createGlowTexture(node.color);
      const glowMat = new THREE.SpriteMaterial({
        map: glowTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.95
      });
      const glowSprite = new THREE.Sprite(glowMat);
      glowSprite.scale.setScalar(node.size * 5.0);
      mesh.add(glowSprite);

      if (node.size >= 0.28) {
        const pLight = new THREE.PointLight(node.color, 5, 6);
        pLight.position.set(0, 0, 0);
        mesh.add(pLight);
      }

      graphGroup.add(mesh);
      nodeMeshes.push(mesh);

      if (node.module !== 'CORE' && node.size >= 0.25) {
        const textSprite = createTextSprite(node.module, node.color);
        textSprite.position.set(vec.x, vec.y + 0.55, vec.z);
        graphGroup.add(textSprite);
      } else if (node.module === 'CORE') {
        const textSprite = createTextSprite('CORE ONTOLÓGICO', node.color);
        textSprite.position.set(vec.x, vec.y + 0.65, vec.z);
        graphGroup.add(textSprite);
      }
    });

    const pulses: { mesh: THREE.Mesh; startVec: THREE.Vector3; endVec: THREE.Vector3; progress: number; speed: number }[] = [];

    GRAPH_NODES.forEach((node) => {
      const startVec = nodeMap.get(node.id);
      if (!startVec) return;

      node.connections.forEach((targetId) => {
        const endVec = nodeMap.get(targetId);
        if (!endVec) return;

        const lineMaterial = new THREE.LineBasicMaterial({
          color: new THREE.Color(node.color),
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending
        });

        const lineGeo = new THREE.BufferGeometry().setFromPoints([startVec, endVec]);
        const line = new THREE.Line(lineGeo, lineMaterial);
        graphGroup.add(line);

        const pulseMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(node.color),
          transparent: true,
          opacity: 1.0,
          blending: THREE.AdditiveBlending,
          toneMapped: false
        });

        const pulseMesh = new THREE.Mesh(sphereGeo, pulseMat);
        pulseMesh.scale.setScalar(0.09);
        
        const pulseGlowMat = new THREE.SpriteMaterial({
          map: createGlowTexture(node.color),
          transparent: true,
          blending: THREE.AdditiveBlending,
          opacity: 1.0
        });
        const pulseGlow = new THREE.Sprite(pulseGlowMat);
        pulseGlow.scale.setScalar(0.35);
        pulseMesh.add(pulseGlow);

        graphGroup.add(pulseMesh);

        pulses.push({
          mesh: pulseMesh,
          startVec,
          endVec,
          progress: Math.random(),
          speed: 0.015 + Math.random() * 0.02
        });
      });
    });

    const createRing = (radius: number, color: string, rotX: number, rotY: number) => {
      const ringGeo = new THREE.RingGeometry(radius, radius + 0.04, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        toneMapped: false
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      return ringMesh;
    };

    const ring1 = createRing(4.2, '#00FFFF', Math.PI / 3, 0);
    const ring2 = createRing(4.6, '#FF00FF', -Math.PI / 4, Math.PI / 6);
    graphGroup.add(ring1);
    graphGroup.add(ring2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00FFFF, 8, 30);
    pointLight1.position.set(6, 6, 6);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xFF00FF, 8, 30);
    pointLight2.position.set(-6, -6, -6);
    scene.add(pointLight2);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const targetData = intersects[0].object.userData as GraphNodeData;
        setSelectedNode(targetData);
      }
    };

    renderer.domElement.addEventListener('click', handleClick);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const rotationSpeed = autoRotateRef.current ? 0.15 : 0.02; 
      graphGroup.rotation.y += rotationSpeed * 0.01;
      graphGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.08;

      ring1.rotation.z = elapsedTime * 0.1;
      ring2.rotation.z = -elapsedTime * 0.12;

      nodeMeshes.forEach((m, idx) => {
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 8.0 + Math.sin(elapsedTime * 4 + idx) * 2.0;
      });

      pulses.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 0;
        p.mesh.position.lerpVectors(p.startVec, p.endVec, p.progress);
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const newW = currentMount.clientWidth;
      const newH = currentMount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      sphereGeo.dispose();
      renderer.dispose();
    };
  }, []);

  const generateCypherQuery = (node: GraphNodeData): string => {
    return `MATCH (n:${node.module} {id: '${node.id}'})
-[r:RELATION_TO]->(m)
RETURN n, r, m 
LIMIT 25;`;
  };

  const colors = {
    bg: '#0A0A0B',
    panelBg: '#0B0B0D',
    border: 'rgba(237,234,227,0.11)',
    accent: '#FF9E1B',
    textMain: '#EDEAE3',
    textMuted: '#9A968C',
    textDark: '#7A776E',
    alerta: '#FF9E1B',
    critico: '#EF4444',
    info: '#55C97C'
  };

  const getAlertColor = (nivel: string) => {
    switch(nivel) {
      case 'ALERTA': return colors.alerta;
      case 'CRITICO': return colors.critico;
      case 'INFO': return colors.info;
      default: return colors.info;
    }
  };

  return (
    <div className="w-full min-h-screen font-sans" style={{ backgroundColor: colors.bg, color: colors.textMain }}>
      
      {/* 1. HERO */}
      <section className="relative border-b pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ borderColor: colors.border, backgroundColor: colors.bg }}>
        
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ backgroundImage: `linear-gradient(to right, ${colors.border} 1px, transparent 1px), linear-gradient(to bottom, ${colors.border} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            
            <div className="flex items-center gap-3 font-mono text-xs tracking-widest uppercase" style={{ color: colors.textDark }}>
              <span className="w-8 h-[1px]" style={{ backgroundColor: colors.accent }} />
              <span>GEOSYS // STACK TECNOLÓGICO - V4.2</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
              STACK <br />
              TECNOLÓGICO <br />
              DE <br />
              <span className="text-transparent" style={{ WebkitTextStroke: `2px ${colors.accent}` }}>
                INTELIGENCIA
              </span> <br />
              TERRITORIAL.
            </h1>

            <p className="text-sm sm:text-base leading-relaxed max-w-md" style={{ color: colors.textMuted }}>
              Arquitectura de datos e inteligencia artificial construida sobre <strong style={{color: colors.textMain}}>FastAPI</strong>, <strong style={{color: colors.textMain}}>PostgreSQL</strong>, <strong style={{color: colors.textMain}}>Neo4j</strong>, <strong style={{color: colors.textMain}}>Machine Learning</strong>, <strong style={{color: colors.textMain}}>Scikit-Learn</strong> y <strong style={{color: colors.textMain}}>Ontología Computacional</strong>, con una capa de <strong style={{color: colors.textMain}}>Ingesta de Datos</strong> en tiempo real que alimenta todo el ecosistema.
            </p>

            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
              {[
                { name: 'FASTAPI', color: '#00FF88' },
                { name: 'POSTGRES', color: '#3366FF' },
                { name: 'NEO4J', color: '#00FFFF' },
                { name: 'MACHINE LEARNING', color: '#FF00FF' },
                { name: 'SCIKIT-LEARN', color: '#FFAA00' },
                { name: 'ONTOLOGÍA', color: '#FF0055' },
                { name: 'NEXTJS', color: '#F4A955' }
              ].map((m) => (
                <span key={m.name} className="px-2.5 py-1 border flex items-center gap-1.5" style={{ backgroundColor: colors.panelBg, borderColor: colors.border, color: colors.textMain }}>
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: m.color, boxShadow: `0 0 12px ${m.color}` }} />
                  {m.name}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 font-mono text-xs pt-2">
              <button 
                onClick={() => alert('Conectando con el clúster de demostración...')}
                className="px-6 py-3 font-bold uppercase tracking-widest transition-all flex items-center gap-2"
                style={{ backgroundColor: colors.accent, color: colors.bg }}
              >
                SOLICITAR DEMO <ArrowRight size={16} />
              </button>
              <button 
                className="px-6 py-3 font-bold uppercase tracking-widest border transition-all"
                style={{ borderColor: colors.border, color: colors.textMain }}
              >
                EXPLORAR LA PLATAFORMA
              </button>
            </div>

            {/* Panel del Nodo Seleccionado */}
            <div className="mt-8 p-4 border" style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}>
              <div className="flex items-center justify-between font-mono text-xs mb-3 pb-2 border-b" style={{ borderColor: colors.border }}>
                <span className="font-bold flex items-center gap-2" style={{ color: colors.accent }}>
                  <Terminal size={14} /> INFORMACIÓN DEL NODO
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold border" style={{ color: selectedNode.color, borderColor: selectedNode.color }}>
                  {selectedNode.module}
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-base font-extrabold">{selectedNode.label}</div>
                <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                  {Object.entries(selectedNode.properties).map(([k, v]) => (
                    <div key={k} className="p-2 border" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                      <span className="block text-[9px] uppercase" style={{ color: colors.textDark }}>{k}</span>
                      <span className="font-semibold" style={{ color: colors.accent }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7 relative">
            <div className="p-2 border relative" style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}>
              
              <div className="flex items-center justify-between font-mono text-[11px] px-3 py-2 border-b" style={{ borderColor: colors.border, backgroundColor: colors.bg }}>
                <span className="flex items-center gap-2 font-bold" style={{ color: colors.accent }}>
                  <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: colors.accent }} />
                  VISOR DE STACK TECNOLÓGICO
                </span>
                <button onClick={() => setAutoRotate(!autoRotate)} className="hover:text-white transition-colors flex items-center gap-1" style={{ color: colors.textMuted }}>
                  <RotateCw size={12} /> {autoRotate ? 'ROTA: ON' : 'ROTA: OFF'}
                </button>
              </div>

              <div ref={mountRef} className="w-full h-[400px] sm:h-[480px] cursor-grab active:cursor-grabbing" style={{ background: 'radial-gradient(circle at center, #1a1a1a 0%, #0A0A0B 100%)' }} />

              <div className="p-3 border-t font-mono text-xs" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
                <div className="flex items-center justify-between text-[10px] mb-1.5" style={{ color: colors.textDark }}>
                  <span className="font-bold" style={{ color: colors.accent }}>// CONSULTA CYPHER AUTO-GENERADA:</span>
                  <span>BOLT DRIVER v5.12 ACTIVE</span>
                </div>
                <pre className="p-2.5 border overflow-x-auto leading-relaxed" style={{ backgroundColor: '#050505', borderColor: colors.border, color: '#39FF14' }}>
                  {generateCypherQuery(selectedNode)}
                </pre>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. ARQUITECTURA DE MÓDULOS (ESTILO TARJETAS DE ALERTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b" style={{ borderColor: colors.border }}>
        <div className="mb-10">
          <div className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: colors.accent }}>// COMPONENTES DEL STACK</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase">TECNOLOGÍAS DE LA PLATAFORMA</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Lista de Módulos */}
          <div className="lg:col-span-5 space-y-3">
            {MODULOS.map((mod) => {
              const isSelected = moduloActivo.id === mod.id;
              const alertColor = getAlertColor(mod.nivelAlerta);
              return (
                <div
                  key={mod.id}
                  onClick={() => setModuloActivo(mod)}
                  className={`p-4 cursor-pointer transition-all border-l-4`}
                  style={{ 
                    backgroundColor: isSelected ? '#141311' : colors.panelBg,
                    borderLeftColor: isSelected ? colors.accent : 'transparent',
                    borderColor: colors.border
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 font-mono text-[10px]">
                    <span className="font-bold tracking-wider" style={{ color: colors.accent }}>{mod.tiempo}</span>
                    <span className={`px-1.5 py-0.5 font-semibold border`} 
                          style={{ 
                            color: alertColor, 
                            borderColor: `${alertColor}50`,
                            backgroundColor: `${alertColor}15`
                          }}>
                      {mod.nivelAlerta}
                    </span>
                  </div>

                  <h4 className="font-sans text-xs font-extrabold uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <MapPin size={12} style={{ color: colors.textMuted }} />
                    {mod.nombre}
                  </h4>

                  <p className="font-sans text-xs font-semibold mb-2" style={{ color: colors.textMuted }}>
                    {mod.subtitulo}
                  </p>

                  <p className="font-mono text-[11px] line-clamp-2 leading-relaxed" style={{ color: colors.textDark }}>
                    {mod.descripcion}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Ficha Técnica Detallada */}
          <div className="lg:col-span-7 p-6 sm:p-8 border" style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: colors.border }}>
              <div>
                <span className="font-mono text-xs font-bold tracking-widest uppercase" style={{ color: colors.accent }}>ESPECIFICACIÓN TÉCNICA</span>
                <h3 className="text-xl sm:text-2xl font-extrabold uppercase mt-1">
                  {moduloActivo.nombre}
                </h3>
              </div>
              <div className="font-mono text-xs px-3 py-1.5 border" style={{ borderColor: moduloActivo.color, color: colors.textMain }}>
                {moduloActivo.métricaRendimiento}
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6 font-sans" style={{ color: colors.textMuted }}>
              {moduloActivo.descripcion}
            </p>

            <div className="space-y-3 mb-8">
              <span className="font-mono text-xs font-bold block uppercase tracking-wider" style={{ color: colors.textMain }}>
                CAPACIDADES INTEGRADAS:
              </span>
              {moduloActivo.capacidades.map((cap, idx) => (
                <div key={idx} className="flex items-start gap-3 font-mono text-xs p-3 border" style={{ backgroundColor: colors.bg, borderColor: colors.border, color: colors.textMain }}>
                  <CheckCircle2 size={16} style={{ color: colors.accent }} className="shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t flex justify-between items-center font-mono text-xs" style={{ borderColor: colors.border, color: colors.textDark }}>
              <span>INTEGRACIÓN: COMPLETA</span>
              <span style={{ color: colors.accent }}>STATUS: ONLINE</span>
            </div>
          </div>

        </div>
      </section>

      {/* 3. STACK INFRAESTRUCTURAL */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="font-mono text-xs tracking-widest uppercase mb-1" style={{ color: colors.accent }}>// ARQUITECTURA DE DATOS</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase">
              STACK TECNOLÓGICO INTEGRADO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            
            <div className="p-6 border" style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}>
              <div className="flex items-center gap-2 font-bold mb-4 pb-2 border-b" style={{ borderColor: colors.border, color: colors.accent }}>
                <Database size={18} />
                <span>POSTGRESQL + POSTGIS</span>
              </div>
              <ul className="space-y-2.5" style={{ color: colors.textMuted }}>
                <li className="flex justify-between">
                  <span>Versión:</span>
                  <span style={{ color: colors.textMain }}>PostgreSQL 16</span>
                </li>
                <li className="flex justify-between">
                  <span>Extensiones:</span>
                  <span style={{ color: colors.textMain }}>PostGIS, pgvector</span>
                </li>
                <li className="flex justify-between">
                  <span>Índices:</span>
                  <span style={{ color: colors.textMain }}>GIN, GiST, HNSW</span>
                </li>
              </ul>
            </div>

            <div className="p-6 border" style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}>
              <div className="flex items-center gap-2 font-bold mb-4 pb-2 border-b" style={{ borderColor: colors.border, color: colors.accent }}>
                <Network size={18} />
                <span>NEO4J + GDS</span>
              </div>
              <ul className="space-y-2.5" style={{ color: colors.textMuted }}>
                <li className="flex justify-between">
                  <span>Engine:</span>
                  <span style={{ color: colors.textMain }}>Neo4j v5.12</span>
                </li>
                <li className="flex justify-between">
                  <span>Query:</span>
                  <span style={{ color: colors.textMain }}>Cypher Language</span>
                </li>
                <li className="flex justify-between">
                  <span>Algoritmos:</span>
                  <span style={{ color: colors.textMain }}>PageRank, Louvain</span>
                </li>
              </ul>
            </div>

            <div className="p-6 border" style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}>
              <div className="flex items-center gap-2 font-bold mb-4 pb-2 border-b" style={{ borderColor: colors.border, color: colors.accent }}>
                <Cpu size={18} />
                <span>ML + SCIKIT-LEARN</span>
              </div>
              <ul className="space-y-2.5" style={{ color: colors.textMuted }}>
                <li className="flex justify-between">
                  <span>Modelos:</span>
                  <span style={{ color: colors.textMain }}>Random Forest, XGBoost</span>
                </li>
                <li className="flex justify-between">
                  <span>Pipeline:</span>
                  <span style={{ color: colors.textMain }}>MLflow + Scikit-Learn</span>
                </li>
                <li className="flex justify-between">
                  <span>Inferencia:</span>
                  <span style={{ color: colors.textMain }}>Tiempo real (45ms)</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="p-8 sm:p-12 border relative overflow-hidden" style={{ backgroundColor: colors.panelBg, borderColor: colors.border }}>
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-wide">
              ¿LISTO PARA IMPLEMENTAR ESTE STACK?
            </h2>
            <p className="text-sm font-sans" style={{ color: colors.textMuted }}>
              Explora cómo integrar FastAPI, PostgreSQL, Neo4j, Machine Learning, Scikit-Learn y Ontología Computacional en tu plataforma territorial.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4 font-mono text-xs">
              <button 
                onClick={() => alert('Conectando con el clúster de demostración...')}
                className="px-6 py-3 font-bold uppercase tracking-widest transition-all flex items-center gap-2"
                style={{ backgroundColor: colors.accent, color: colors.bg }}
              >
                PROBAR STACK DEMO <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}