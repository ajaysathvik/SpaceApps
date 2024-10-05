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
      <Canvas
        camera={{ position: [0,0, 400], near: 0.1, far: 10000 }}
      >
        <ScrollControls pages={2} damping={0.1}>
          <ScrollManager section={section} setSection={setSection} />

          <ambientLight intensity={5} />
          <pointLight
            position={[0, 0, 600]}
            intensity={1000}
            distance={10000}
            decay={2}
            color="white"
            castShadow
          />
          <color attach="background" args={["#000000"]} />

<<<<<<< HEAD
            {/*<Stars*/}
            {/*    radius={80}*/}
            {/*    depth={3000}*/}
            {/*    count={10000}*/}
            {/*    factor={100}*/}
            {/*    saturation={5}*/}
            {/*    fade*/}
            {/*    speed={0.1}*/}
            {/*/>*/}
=======
          <Stars
            radius={80}
            depth={3000}
            count={5000}
            factor={60}
            saturation={5}
            fade
            speed={0.1}
          />
>>>>>>> 3b39ef6 (fix: home amination)


         
<OrbitControls
          enableZoom={false}
          
        
        />x
 <SolarSystem section={section} />
            <Scroll html>
              <Interface />
            </Scroll>
         
        </ScrollControls>
      </Canvas>
    </div>
  );
}
