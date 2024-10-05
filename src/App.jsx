import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls, Scroll, Stars } from "@react-three/drei";

import Earth from "./models/Earth";
import { ScrollManager } from "./components/ScrollManager";
import { Interface } from "./components/Interface";
import Jupiter from "./models/Jupiter";
import Saturn from "./models/Saturn";
import Neptune from "./models/Neptune";
export default function App() {
  const [section, setSection] = useState(0);

  return (
    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 600], fov: 75, near: 0.1, far: 10000 }}>
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

          <Earth position={[0, -1000, 200]} section={section} scale={[1.5, 1.5, 1.5]} />
          <Scroll html>
            <Interface/>
          </Scroll>
          </Scroll>
        </ScrollControls>
        
        
      </Canvas>
    </div>
  );
}