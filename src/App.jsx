import React from 'react';
import { Canvas } from '@react-three/fiber';
import { AxesHelper } from 'three'; // Correct import
import Earth from './models/Earth';
import { OrbitControls } from '@react-three/drei';

export default function App() {
  return (
    <div className="h-screen">
      <Canvas camera={{ position: [100,100, 1000], near: 0.1, far: 1000 }}>
        <ambientLight intensity={10} />
        
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <primitive object={new AxesHelper(5)} /> {/* Add AxesHelper as a primitive */}
        <Earth position={[0, 0, 0]} scale={[1, 1, 1]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
