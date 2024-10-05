import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import {OrbitControls, ScrollControls, Scroll, Stars, CameraControls} from "@react-three/drei";

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
        <Canvas camera={{ position: [0, 0, 600], fov: 75, near: 0.1, far: 10000 }}>
          <ScrollControls pages={2} damping={0.1}>
            <ScrollManager section={section} setSection={setSection} />

            <ambientLight intensity={4} />
            <color attach="background" args={["#000000"]} />

            {/*<Stars*/}
            {/*    radius={80}*/}
            {/*    depth={3000}*/}
            {/*    count={10000}*/}
            {/*    factor={100}*/}
            {/*    saturation={5}*/}
            {/*    fade*/}
            {/*    speed={0.1}*/}
            {/*/>*/}

            <Scroll>
              <SolarSystem section={section} />
              <OrbitControls/>
              <CameraControls></CameraControls>
              <Scroll html>
                <Interface />
              </Scroll>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
  );
}
