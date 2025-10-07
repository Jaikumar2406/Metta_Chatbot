import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Character({ mouse }) {
  const group = useRef();
  
  // Simple head rotation based on mouse position
  useFrame(() => {
    if (group.current) {
      // Smoothly rotate head to look at mouse
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        (mouse.current.x * Math.PI) / 8, // Limit rotation to 22.5 degrees
        0.1
      );
      
      // Subtle head tilt based on vertical mouse position
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        (mouse.current.y * Math.PI) / 16, // Limit tilt to 11.25 degrees
        0.1
      );
    }
  });

  return (
    <group ref={group}>
      {/* Minimal stylized character built from primitives */}
      {/* Body */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 1.5, 0.6]} />
        <meshStandardMaterial color="#111" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Head that subtly tracks the mouse */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#eee" metalness={0.1} roughness={0.4} />
      </mesh>
      {/* Base/ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <circleGeometry args={[2.2, 64]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>
    </group>
  );
}
