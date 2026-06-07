import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const WALL_H = 2.35;
const WALL_T = 0.1;

type BoxProps = {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  roughness?: number;
  metalness?: number;
};

function Box({ position, size, color, roughness = 0.75, metalness = 0 }: BoxProps) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

function Wall({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return <Box position={position} size={size} color="#f5f5f2" roughness={0.9} />;
}

function WindowFrame({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
  return (
    <group position={position}>
      <Box position={[0, 0, 0]} size={size} color="#1e1e24" roughness={0.4} metalness={0.2} />
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[size[0] * 0.92, size[1] * 0.92, 0.02]} />
        <meshStandardMaterial color="#9ec9e8" roughness={0.1} metalness={0.1} transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

function ApartmentModel() {
  const wood = "#c8a87a";
  const tile = "#9a9a9a";
  const darkWood = "#4a3728";

  const walls = useMemo(
    () =>
      [
        { pos: [0, WALL_H / 2, -4.2] as [number, number, number], size: [11.5, WALL_H, WALL_T] as [number, number, number] },
        { pos: [0, WALL_H / 2, 4.2] as [number, number, number], size: [11.5, WALL_H, WALL_T] as [number, number, number] },
        { pos: [-5.75, WALL_H / 2, 0] as [number, number, number], size: [WALL_T, WALL_H, 8.4] as [number, number, number] },
        { pos: [5.75, WALL_H / 2, 0] as [number, number, number], size: [WALL_T, WALL_H, 8.4] as [number, number, number] },
        { pos: [-2.3, WALL_H / 2, -1.2] as [number, number, number], size: [WALL_T, WALL_H, 6] as [number, number, number] },
        { pos: [-2.3, WALL_H / 2, 2.6] as [number, number, number], size: [WALL_T, WALL_H, 3.2] as [number, number, number] },
        { pos: [1.2, WALL_H / 2, 0.8] as [number, number, number], size: [7, WALL_H, WALL_T] as [number, number, number] },
        { pos: [2.8, WALL_H / 2, -2.2] as [number, number, number], size: [WALL_T, WALL_H, 4] as [number, number, number] },
        { pos: [-0.8, WALL_H / 2, -2.8] as [number, number, number], size: [3.2, WALL_H, WALL_T] as [number, number, number] },
      ] as const,
    [],
  );

  return (
    <group position={[0, -0.05, 0]}>
      {/* Floors */}
      <Box position={[1.8, 0.02, 1.2]} size={[7.2, 0.04, 6.8]} color={wood} roughness={0.85} />
      <Box position={[-3.8, 0.02, 1.5]} size={[3.8, 0.04, 5.2]} color={wood} roughness={0.85} />
      <Box position={[-4.2, 0.02, -2.5]} size={[3, 0.04, 3.2]} color={tile} roughness={0.6} />

      {walls.map((w, i) => (
        <Wall key={i} position={w.pos} size={w.size} />
      ))}

      {/* Bathroom */}
      <Box position={[-4.5, 0.45, -2.8]} size={[1.6, 0.9, 0.55]} color="#6b6b6b" roughness={0.5} />
      <Box position={[-4.5, 1.15, -3.35]} size={[1.1, 1.1, 0.04]} color="#d8d8d8" metalness={0.8} roughness={0.2} />
      <Box position={[-3.6, 0.55, -3.55]} size={[0.08, 1.2, 1.1]} color="#1a1a1a" roughness={0.3} />
      <mesh position={[-3.55, 0.55, -3.55]}>
        <boxGeometry args={[0.02, 1.1, 1.05]} />
        <meshStandardMaterial color="#b8dff5" transparent opacity={0.35} roughness={0.1} />
      </mesh>

      {/* Dining */}
      <Box position={[-0.2, 0.38, -1.8]} size={[1.6, 0.08, 0.9]} color={darkWood} roughness={0.7} />
      {[
        [-0.9, -2.1],
        [0.5, -2.1],
        [-0.9, -1.5],
        [0.5, -1.5],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0.42, z]}>
          <Box position={[0, 0.22, 0]} size={[0.08, 0.44, 0.08]} color={darkWood} />
          <Box position={[0, 0.48, 0]} size={[0.42, 0.06, 0.42]} color="#7a7a7a" roughness={0.9} />
        </group>
      ))}
      {[-1.4, -0.6, 0.2, 0.8, 1.2].map((x, i) => (
        <Box key={i} position={[x, 1.05, -3.55]} size={[0.35, 0.45, 0.02]} color="#e8e4dc" roughness={0.9} />
      ))}

      {/* Kitchen */}
      <Box position={[3.8, 0.95, -1.2]} size={[0.9, 1.9, 0.75]} color="#c0c4c8" metalness={0.6} roughness={0.35} />
      <Box position={[4.85, 1.05, -1.2]} size={[0.55, 2.1, 0.45]} color={darkWood} roughness={0.8} />
      {[0.6, 1.1, 1.6].map((y, i) => (
        <Box key={i} position={[4.85, y, -1.05]} size={[0.48, 0.04, 0.38]} color="#8a6a4a" roughness={0.7} />
      ))}

      {/* Living room */}
      <Box position={[4.2, 0.35, 2.2]} size={[2.4, 0.7, 1]} color="#f0f0f0" roughness={0.95} />
      <Box position={[4.5, 0.42, 2.35]} size={[0.35, 0.12, 0.35]} color="#8b5a2b" roughness={0.9} />
      <Box position={[3.5, 0.18, 3.2]} size={[0.45, 0.36, 0.45]} color="#1a1a1a" roughness={0.4} />
      <mesh position={[5.2, 0.55, 3.5]}>
        <cylinderGeometry args={[0.22, 0.28, 0.5, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      <mesh position={[5.2, 1.1, 3.5]}>
        <sphereGeometry args={[0.55, 12, 12]} />
        <meshStandardMaterial color="#3d7a3d" roughness={0.85} />
      </mesh>
      <Box position={[5.4, 1.2, 1.2]} size={[1.2, 0.9, 0.06]} color="#d4cbb8" roughness={0.9} />
      <Box position={[3.2, 0.85, 2.8]} size={[0.5, 1.7, 0.35]} color={darkWood} roughness={0.8} />

      {/* Bedroom */}
      <Box position={[0.5, 0.28, 3]} size={[2.2, 0.45, 1.6]} color="#f5f5f5" roughness={0.95} />
      <Box position={[0.2, 0.42, 3.2]} size={[0.45, 0.12, 0.45]} color="#8b5a2b" roughness={0.9} />
      <Box position={[1.8, 0.75, 3.8]} size={[0.9, 1.5, 0.3]} color={darkWood} roughness={0.8} />

      {/* Entry */}
      <Box position={[0.2, 1.05, -3.75]} size={[0.9, 2.1, 0.12]} color={darkWood} roughness={0.75} />
      <Box position={[-0.5, 0.7, -3.2]} size={[0.08, 1.4, 0.08]} color={darkWood} />
      <Box position={[-0.5, 1.45, -3.2]} size={[0.5, 0.08, 0.08]} color={darkWood} />

      {/* Windows */}
      <WindowFrame position={[5.74, 1.2, 2.5]} size={[0.08, 1.1, 1.8]} />
      <WindowFrame position={[5.74, 1.2, -0.5]} size={[0.08, 1.1, 1.4]} />
      <WindowFrame position={[1.5, 1.2, 4.19]} size={[1.4, 1, 0.08]} />
      <WindowFrame position={[-1, 1.2, 4.19]} size={[1.2, 1, 0.08]} />
    </group>
  );
}

export function Apartment3D() {
  return (
    <div className="relative w-full h-[420px] md:h-[520px] lg:h-[580px] rounded-sm overflow-hidden border border-border shadow-luxe bg-[#eef1f5] touch-none">
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [9, 9, 9], fov: 38 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#eef1f5"]} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[6, 10, 4]} intensity={0.85} color="#ffffff" />
        <directionalLight position={[-4, 6, -2]} intensity={0.35} color="#fff8ee" />
        <ApartmentModel />
        <OrbitControls
          enablePan={false}
          minDistance={7}
          maxDistance={18}
          minPolarAngle={0.35}
          maxPolarAngle={Math.PI / 2.15}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
          zoomSpeed={0.8}
        />
      </Canvas>

      <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-navy-deep/70 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
        3D Floor Plan
      </div>
      <div className="absolute bottom-4 right-4 text-[10px] tracking-[0.2em] uppercase text-navy-deep/50 pointer-events-none">
        Drag · Pinch · Scroll to explore
      </div>
    </div>
  );
}

export default Apartment3D;
