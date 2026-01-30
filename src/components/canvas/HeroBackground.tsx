"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function NeuralNetwork() {
  const count = 100;
  const radius = 10;
  
  // Create randomized points
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * radius * 2;     // x
        p[i * 3 + 1] = (Math.random() - 0.5) * radius * 2; // y
        p[i * 3 + 2] = (Math.random() - 0.5) * radius * 2; // z
    }
    return p;
  }, []);
  
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
        groupRef.current.rotation.x += delta * 0.05;
        groupRef.current.rotation.y += delta * 0.05;
    }
  });
  
  // Dynamic Connections (Optional: expensive calculation, optimize if needed)
  // For a static graph rotating, we pre-calculate lines. 
  // But for a dynamic feel, let's just rotate the group.

  return (
    <group ref={groupRef}>
        <Points positions={points} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#8b5cf6"
                size={0.1}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.8}
            />
        </Points>
    </group>
  );
}

// Better approach for Neural Net: Use Line Segments
function Connections() {
    const count = 40; // Fewer points for lines to avoid performance hit
    const radius = 10;
    const lines = useMemo(() => {
        const points = [];
        // Generate points
        const nodes = [];
        for(let i=0; i<count; i++) {
            nodes.push(new THREE.Vector3((Math.random()-0.5)*radius, (Math.random()-0.5)*radius, (Math.random()-0.5)*radius));
        }
        
        // Connect close nodes
        for(let i=0; i<count; i++) {
            for(let j=i+1; j<count; j++) {
                if(nodes[i].distanceTo(nodes[j]) < 4) {
                    points.push(nodes[i]);
                    points.push(nodes[j]);
                }
            }
        }
        return points;
    }, []);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry().setFromPoints(lines);
        return geo;
    }, [lines]);

    const groupRef = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if(groupRef.current) {
            groupRef.current.rotation.y -= delta * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <lineSegments geometry={geometry}>
                <lineBasicMaterial color="#06b6d4" transparent opacity={0.15} />
            </lineSegments>
        </group>
    )

}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={["#000000"]} />
        <NeuralNetwork /> 
        <Connections />
      </Canvas>
    </div>
  );
}
