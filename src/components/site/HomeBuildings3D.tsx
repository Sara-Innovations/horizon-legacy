import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type BuildingSpec = {
  position: [number, number, number];
  width: number;
  depth: number;
  height: number;
  color: string;
  emissive: string;
  rotation?: number;
};

const BUILDINGS: BuildingSpec[] = [
  { position: [-4.5, 0, -1], width: 2.2, depth: 2.2, height: 9.5, color: "#5a9fd4", emissive: "#1a3a6a", rotation: 0.08 },
  { position: [0, 0, 0.5], width: 2.8, depth: 2.8, height: 12, color: "#7fb8ff", emissive: "#204878" },
  { position: [4.2, 0, -0.5], width: 2, depth: 2.4, height: 7.8, color: "#4a8ec8", emissive: "#152d55", rotation: -0.1 },
  { position: [-1.8, 0, 3.2], width: 3.6, depth: 1.6, height: 4.8, color: "#3d6f9c", emissive: "#0f2540", rotation: 0.15 },
  { position: [2.5, 0, 3.5], width: 1.8, depth: 1.8, height: 6.2, color: "#6aacde", emissive: "#1a3358", rotation: -0.05 },
];

const SKYLINE = Array.from({ length: 16 }, (_, i) => ({
  x: (i - 8) * 2.4 + Math.sin(i) * 1.2,
  h: 1.2 + Math.abs(Math.sin(i * 1.4)) * 4.5,
  z: -13 - Math.abs(Math.cos(i * 0.6)) * 3,
  w: 1 + Math.abs(Math.cos(i)) * 0.5,
}));

function Building({ spec }: { spec: BuildingSpec }) {
  const baseY = -2.2;
  return (
    <group position={spec.position} rotation={[0, spec.rotation ?? 0, 0]}>
      <mesh position={[0, baseY - 0.5, 0]}>
        <boxGeometry args={[spec.width + 0.5, 0.35, spec.depth + 0.5]} />
        <meshStandardMaterial color="#1a2440" roughness={0.85} />
      </mesh>
      <mesh position={[0, baseY + spec.height / 2, 0]}>
        <boxGeometry args={[spec.width, spec.height, spec.depth]} />
        <meshStandardMaterial
          color={spec.color}
          metalness={0.65}
          roughness={0.25}
          emissive={spec.emissive}
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh position={[0, baseY + spec.height + 0.1, 0]}>
        <boxGeometry args={[spec.width * 0.55, 0.12, spec.depth * 0.55]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.35} />
      </mesh>
    </group>
  );
}

function SkylineInstances() {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const temp = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    SKYLINE.forEach((b, i) => {
      temp.position.set(b.x, b.h / 2 - 3.5, b.z);
      temp.scale.set(b.w, b.h, b.w);
      temp.updateMatrix();
      mesh.setMatrixAt(i, temp.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [temp]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, SKYLINE.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0d1a33" emissive="#1a2d55" emissiveIntensity={0.3} roughness={0.8} />
    </instancedMesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[8, 10, 6]} intensity={0.9} color="#fff4d6" />
      <directionalLight position={[-5, 4, -3]} intensity={0.25} color="#7ea2ff" />

      <group>
        {BUILDINGS.map((b, i) => (
          <Building key={i} spec={b} />
        ))}
      </group>

      <SkylineInstances />
    </>
  );
}

export function HomeBuildings3D() {
  return (
    <div className="relative w-full h-[480px] md:h-[560px] lg:h-[620px] rounded-sm overflow-hidden border border-border shadow-luxe bg-[#0a1428] touch-none">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 3.5, 14], fov: 42 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#0a1428"]} />
        <fog attach="fog" args={["#0a1428", 18, 40]} />
        <Scene />
        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={22}
          minPolarAngle={0.3}
          maxPolarAngle={Math.PI / 2.05}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
          zoomSpeed={0.8}
        />
      </Canvas>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />

      <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-white/80 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
        Interactive 3D Skyline
      </div>
      <div className="absolute top-4 right-4 text-[10px] tracking-[0.2em] uppercase text-white/50 pointer-events-none">
        Drag · Pinch · Scroll
      </div>

      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 pointer-events-none">
        {["Gulshan Tower", "Motijheel Centre", "Purbachal Heights", "Chattogram Bay", "Uttara Quarter"].map((label) => (
          <span
            key={label}
            className="px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase border border-white/20 text-white/70 backdrop-blur-sm bg-navy-deep/40"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default HomeBuildings3D;
