import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  ScrollControls,
  Scroll,
  Stars,
  CameraControls,
} from "@react-three/drei";

import Earth from "./models/Earth";
import SolarSystem from "./models/Solar";
import { ScrollManager } from "./components/ScrollManager";
import { Interface } from "./components/Interface";
import Jupiter from "./models/Jupiter";
import Saturn from "./models/Saturn";
import Neptune from "./models/Neptune";
export default function App() {
  const [section, setSection] = useState(0);

  return (
      <div className="h-screen">
        <Canvas camera={{ position: [0, 0, 400], fov: 75, near: 0.1, far: 100000 }}>
          <ScrollControls pages={2} damping={0.1}>
            <ScrollManager section={section} setSection={setSection}/>
            <ambientLight intensity={4}/>
            <pointLight position={[0, 0, 0]} intensity={10} distance={10000} color="#ffffff"/>
            <color attach="background" args={["#000000"]}/>

          <Stars
            radius={80}
            depth={3000}
            count={5000}
            factor={60}
            saturation={5}
            fade
            speed={0.1}
          />

            <Scroll>
              <SolarSystem section={section}/>
              <OrbitControls/>
              <CameraControls></CameraControls>
              <Scroll html>
                <Interface/>
              </Scroll>
            </Scroll>
         
        </ScrollControls>
      </Canvas>
    </div>
  );
}
