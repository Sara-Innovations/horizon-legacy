import { Suspense, useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html, Float, Sparkles, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

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

function Tower({ night, onHover }: { night: boolean; onHover: (h: Hotspot | null) => void }) {
  const group = useRef<THREE.Group>(null!);
  const auto = useRef(true);
  const { camera } = useThree();

  // Auto-rotate when idle
  useFrame((_, dt) => {
    if (auto.current && group.current) group.current.rotation.y += dt * 0.15;
  });

  // Cinematic camera intro
  useEffect(() => {
    camera.position.set(14, 8, 14);
    gsap.to(camera.position, { x: 7, y: 4, z: 8, duration: 2.4, ease: "power3.out" });
  }, [camera]);

  const floors = useMemo(() => Array.from({ length: 22 }, (_, i) => i), []);
  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: night ? "#0a1b3a" : "#7fb8ff",
        metalness: 0.9,
        roughness: 0.08,
        transmission: 0.5,
        thickness: 0.6,
        envMapIntensity: 1.4,
        emissive: night ? "#1d3a72" : "#000000",
        emissiveIntensity: night ? 0.35 : 0,
      }),
    [night]
  );
  const frame = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#d4af37", metalness: 1, roughness: 0.3 }),
    []
  );
  const concrete = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#1a2440", metalness: 0.3, roughness: 0.7 }),
    []
  );

  return (
    <group
      ref={group}
      onPointerDown={() => (auto.current = false)}
      onPointerEnter={() => (auto.current = false)}
      onPointerLeave={() => (auto.current = true)}
    >
      {/* Podium */}
      <mesh position={[0, -2.5, 0]} material={concrete} castShadow receiveShadow>
        <boxGeometry args={[5, 1, 5]} />
      </mesh>
      <mesh position={[0, -1.85, 0]} material={frame} castShadow>
        <boxGeometry args={[5.1, 0.1, 5.1]} />
      </mesh>

      {/* Main tower stacked floors */}
      {floors.map((i) => {
        const taper = 1 - i * 0.018;
        const y = -1.3 + i * 0.45;
        return (
          <group key={i} position={[0, y, 0]}>
            <mesh material={glass} castShadow>
              <boxGeometry args={[2.4 * taper, 0.4, 2.4 * taper]} />
            </mesh>
            <mesh material={frame} position={[0, 0.22, 0]}>
              <boxGeometry args={[2.45 * taper, 0.04, 2.45 * taper]} />
            </mesh>
          </group>
        );
      })}

      {/* Side annex */}
      <mesh material={glass} position={[1.7, -0.5, 0]} castShadow>
        <boxGeometry args={[1, 3.8, 2.2]} />
      </mesh>
      <mesh material={glass} position={[-1.7, -1, 0]} castShadow>
        <boxGeometry args={[1, 2.8, 2.2]} />
      </mesh>

      {/* Rooftop garden */}
      <mesh position={[0, 8.95, 0]} castShadow>
        <cylinderGeometry args={[1.1, 1.1, 0.15, 24]} />
        <meshStandardMaterial color="#3f7a4a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 9.3, 0]} material={frame} castShadow>
        <coneGeometry args={[0.15, 0.7, 6]} />
      </mesh>

      {/* Window glow at night */}
      {night &&
        floors.map((i) =>
          [-1, 1].map((s) => (
            <pointLight
              key={`l${i}-${s}`}
              position={[s * 1.1, -1.3 + i * 0.45, 1.1]}
              intensity={0.06}
              color="#ffd27a"
              distance={2}
            />
          ))
        )}

      {/* Hotspots */}
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
      <Float speed={2} rotationIntensity={0} floatIntensity={0.4}>
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
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#d4af37" />
        </mesh>
        <mesh>
          <ringGeometry args={[0.18, 0.22, 32]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={hover ? 0.9 : 0.45} side={THREE.DoubleSide} />
        </mesh>
      </Float>
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

function Skyline({ night }: { night: boolean }) {
  const bldgs = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        x: (i - 15) * 2.2 + (Math.sin(i) * 1.5),
        h: 2 + Math.abs(Math.sin(i * 1.7)) * 6,
        z: -12 - Math.abs(Math.cos(i)) * 4,
        w: 1.2 + Math.abs(Math.cos(i)) * 0.5,
      })),
    []
  );
  return (
    <group>
      {bldgs.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2 - 3, b.z]}>
          <boxGeometry args={[b.w, b.h, b.w]} />
          <meshStandardMaterial
            color={night ? "#0a142b" : "#2a3a5c"}
            emissive={night ? "#1a2b55" : "#000"}
            emissiveIntensity={night ? 0.3 : 0}
            roughness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export function Building3D() {
  const [night, setNight] = useState(false);
  const [active, setActive] = useState<Hotspot | null>(null);

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-sm overflow-hidden bg-gradient-hero">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [7, 4, 8], fov: 45 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[night ? "#050914" : "#13243f"]} />
        <fog attach="fog" args={[night ? "#050914" : "#13243f", 18, 45]} />

        {/* Lighting */}
        <ambientLight intensity={night ? 0.15 : 0.35} />
        <directionalLight
          position={night ? [-8, 6, -4] : [10, 14, 6]}
          intensity={night ? 0.4 : 1.3}
          color={night ? "#7ea2ff" : "#fff2d6"}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[0, 8, 0]} intensity={night ? 1.2 : 0.4} color="#d4af37" />

        <Suspense fallback={null}>
          <Environment preset={night ? "night" : "sunset"} />
          <Tower night={night} onHover={setActive} />
          <Skyline night={night} />
          {night && <Stars radius={60} depth={40} count={2000} factor={3} fade speed={1} />}
          <Sparkles count={60} scale={14} size={2} speed={0.3} color={night ? "#ffd27a" : "#ffffff"} />
          <ContactShadows position={[0, -3, 0]} opacity={0.55} blur={2.2} far={10} resolution={512} />
        </Suspense>

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

      {/* Overlay UI */}
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
