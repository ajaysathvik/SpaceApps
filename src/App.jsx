import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls, Scroll, Stars } from "@react-three/drei";
import Solar from "./models/Solar"

import Earth from "./models/Earth";
import { ScrollManager } from "./components/ScrollManager";
import { Interface } from "./components/Interface";

export default function App() {
  const [section, setSection] = useState(0);

  return (
    <div className="h-screen">
       <Canvas
        camera={{ position: [0, 0, 200], fov: 50, near: 0.1, far: 10000 }} // Adjust camera position and FOV
      >
        <ScrollControls pages={2} damping={0.1}>
          <ScrollManager section={section} setSection={setSection} />
          
          <ambientLight intensity={5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          
          <color attach="background" args={["#000000"]} />
          
          <Stars 
            radius={500} 
            depth={100} 
            count={10000} 
            factor={10} 
            saturation={0} 
            fade 
            speed={0.1}
          />
          
         
          <Scroll>

          {/* <Solar position={[0, -1000, 200]} scale={[1.5, 1.5, 1.5]} /> */}
          <Scroll html>
            <Interface/>
          </Scroll>
          </Scroll>
        </ScrollControls>
        <OrbitControls
          enableZoom={true}
          minDistance={100}    // Minimum zoom distance for better visibility
          maxDistance={500}    // Maximum zoom distance
          zoomSpeed={0.8}      // Adjust zoom speed for smoother control
        />

        
      </Canvas>
    </div>
  );
}