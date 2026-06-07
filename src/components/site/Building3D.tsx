import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "@/hooks/use-in-view";

type Hotspot = {
  id: string;
  label: string;
  desc: string;
  position: [number, number, number];
};

const HOTSPOTS: Hotspot[] = [
  { id: "rooftop", label: "Green Rooftop", desc: "Sky garden with native flora and solar canopy.", position: [0, 4.3, 0] },
  { id: "residential", label: "Residential Tower", desc: "120 luxury sky residences with panoramic views.", position: [1.4, 2.6, 1.2] },
  { id: "amenities", label: "Luxury Amenities", desc: "Spa, infinity pool, private cinema and lounge.", position: [-1.4, 1.4, 1.2] },
  { id: "commercial", label: "Commercial Space", desc: "Grade-A offices and flagship retail boulevard.", position: [1.4, -0.4, 1.2] },
  { id: "parking", label: "Smart Parking", desc: "Automated EV-ready underground parking.", position: [-1.4, -1.8, 1.2] },
];

const SKYLINE = Array.from({ length: 14 }, (_, i) => ({
  x: (i - 7) * 2.2 + Math.sin(i) * 1.2,
  h: 1.5 + Math.abs(Math.sin(i * 1.5)) * 5,
  z: -12 - Math.abs(Math.cos(i)) * 3,
  w: 1 + Math.abs(Math.cos(i)) * 0.5,
}));

function Tower({ night, onHover }: { night: boolean; onHover: (h: Hotspot | null) => void }) {
  const group = useRef<THREE.Group>(null!);
  const auto = useRef(true);

  useFrame((_, dt) => {
    if (auto.current && group.current) group.current.rotation.y += dt * 0.12;
  });

  const glass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: night ? "#1a3568" : "#6aaddf",
        metalness: 0.7,
        roughness: 0.2,
        emissive: night ? "#1d3a72" : "#102040",
        emissiveIntensity: night ? 0.45 : 0.12,
      }),
    [night],
  );

  const frame = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d4af37", metalness: 0.9, roughness: 0.35 }),
    [],
  );

  const concrete = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1a2440", roughness: 0.8 }),
    [],
  );

  return (
    <group
      ref={group}
      onPointerDown={() => (auto.current = false)}
      onPointerEnter={() => (auto.current = false)}
      onPointerLeave={() => (auto.current = true)}
    >
      <mesh position={[0, -2.5, 0]} material={concrete}>
        <boxGeometry args={[5, 1, 5]} />
      </mesh>
      <mesh position={[0, -1.85, 0]} material={frame}>
        <boxGeometry args={[5.1, 0.1, 5.1]} />
      </mesh>

      <mesh position={[0, 3.2, 0]} material={glass}>
        <boxGeometry args={[2.4, 9.2, 2.4]} />
      </mesh>
      <mesh position={[0, 8.1, 0]} material={frame}>
        <boxGeometry args={[2.5, 0.08, 2.5]} />
      </mesh>

      <mesh material={glass} position={[1.7, -0.5, 0]}>
        <boxGeometry args={[1, 3.8, 2.2]} />
      </mesh>
      <mesh material={glass} position={[-1.7, -1, 0]}>
        <boxGeometry args={[1, 2.8, 2.2]} />
      </mesh>

      <mesh position={[0, 8.95, 0]}>
        <cylinderGeometry args={[1.1, 1.1, 0.15, 16]} />
        <meshStandardMaterial color="#3f7a4a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 9.3, 0]} material={frame}>
        <coneGeometry args={[0.15, 0.7, 6]} />
      </mesh>

      {HOTSPOTS.map((h) => (
        <Hotspot3D key={h.id} h={h} onHover={onHover} />
      ))}
    </group>
  );
}

function Hotspot3D({ h, onHover }: { h: Hotspot; onHover: (h: Hotspot | null) => void }) {
  const [hover, setHover] = useState(false);
  return (
    <group position={h.position}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          onHover(h);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHover(false);
          onHover(null);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color="#d4af37" />
      </mesh>
      {hover && (
        <Html distanceFactor={8} position={[0.3, 0.3, 0]} style={{ pointerEvents: "none" }}>
          <div className="bg-navy-deep/95 border border-gold/40 text-white px-3 py-2 text-xs whitespace-nowrap shadow-luxe backdrop-blur">
            <div className="text-gold font-display text-sm">{h.label}</div>
            <div className="text-white/70 text-[10px] mt-0.5">{h.desc}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function SkylineInstances({ night }: { night: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const temp = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    SKYLINE.forEach((b, i) => {
      temp.position.set(b.x, b.h / 2 - 3, b.z);
      temp.scale.set(b.w, b.h, b.w);
      temp.updateMatrix();
      mesh.setMatrixAt(i, temp.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [temp]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, SKYLINE.length]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={night ? "#0a142b" : "#2a3a5c"}
        emissive={night ? "#1a2b55" : "#000000"}
        emissiveIntensity={night ? 0.3 : 0}
        roughness={0.7}
      />
    </instancedMesh>
  );
}

function Scene({ night, onHover }: { night: boolean; onHover: (h: Hotspot | null) => void }) {
  return (
    <>
      <ambientLight intensity={night ? 0.25 : 0.45} />
      <directionalLight
        position={night ? [-8, 6, -4] : [10, 12, 6]}
        intensity={night ? 0.5 : 1}
        color={night ? "#7ea2ff" : "#fff2d6"}
      />
      <pointLight position={[0, 8, 0]} intensity={night ? 0.6 : 0.3} color="#d4af37" />
      <Tower night={night} onHover={onHover} />
      <SkylineInstances night={night} />
    </>
  );
}

export function Building3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, "80px");
  const [night, setNight] = useState(false);
  const [active, setActive] = useState<Hotspot | null>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] md:h-[620px] rounded-sm overflow-hidden bg-gradient-hero touch-none"
    >
      {!inView && (
        <div className="absolute inset-0 flex items-center justify-center text-white/30 text-xs tracking-[0.3em] uppercase">
          3D Experience
        </div>
      )}

      {inView && (
        <Canvas
          dpr={[1, 1.25]}
          camera={{ position: [7, 4, 8], fov: 45 }}
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <color attach="background" args={[night ? "#050914" : "#13243f"]} />
          <fog attach="fog" args={[night ? "#050914" : "#13243f", 18, 42]} />
          <Scene night={night} onHover={setActive} />
          <OrbitControls
            enablePan={false}
            minDistance={6}
            maxDistance={18}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.1}
            enableDamping
            dampingFactor={0.08}
          />
        </Canvas>
      )}

      <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-white/80">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
        Interactive 3D · Drag · Zoom
      </div>
      <button
        onClick={() => setNight((n) => !n)}
        className="absolute top-4 right-4 text-xs tracking-[0.2em] uppercase border border-white/30 text-white px-3 py-2 hover:bg-white/10 transition backdrop-blur"
      >
        {night ? "☀ Day" : "☾ Night"}
      </button>

      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
        {HOTSPOTS.map((h) => (
          <div
            key={h.id}
            className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase border transition ${
              active?.id === h.id ? "bg-gold text-navy-deep border-gold" : "border-white/20 text-white/70"
            }`}
          >
            {h.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Building3D;
