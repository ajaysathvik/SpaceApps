import React, { useRef, useState } from "react";
import { Canvas,useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  ScrollControls,
  Scroll,
  Stars,
} from "@react-three/drei";

import SolarSystem from "./models/Solar";
import { ScrollManager } from "./components/ScrollManager";
import { Interface } from "./components/Interface";

// Import the new component


const PlanetLogger = ({ sunRef, mercuryRef, venusRef, earthRef, marsRef, jupiterRef, saturnRef, uranusRef, neptuneRef, section }) => {
  useFrame(() => {
    if (earthRef.current) {
      console.log("sunRef", sunRef.current.position);
      console.log("mercuryRef", mercuryRef.current.position);
      console.log("venusRef", venusRef.current.position);
      console.log("earthRef", earthRef.current.position);
      console.log("marsRef", marsRef.current.position);
      console.log("jupiterRef", jupiterRef.current.position);
      console.log("saturnRef", saturnRef.current.position);
      console.log("uranusRef", uranusRef.current.position);
      console.log("neptuneRef", neptuneRef.current.position);
      console.log("section", section);
    }
  });

  return null; // This component doesn't render anything
};

export default function App() {
  // State to manage scroll sections
  const [section, setSection] = useState(0);

  // Refs for the planetary objects
  const sunRef = useRef();
  const mercuryRef = useRef();
  const venusRef = useRef();
  const earthRef = useRef();
  const marsRef = useRef();
  const jupiterRef = useRef();
  const saturnRef = useRef();
  const uranusRef = useRef();
  const neptuneRef = useRef();

  return (

    <div className="h-screen">
      <Canvas camera={{ position: [0, 0, 400], near: 0.1, far: 10000 }}>
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


          <Stars
            radius={80}
            depth={3000}
            count={5000}
            factor={60}
            saturation={5}
            fade
            speed={0.1}
          />


          <OrbitControls enableZoom={false} />

          <SolarSystem
            section={section}
            sunRef={sunRef}
            mercuryRef={mercuryRef}
            venusRef={venusRef}
            earthRef={earthRef}
            marsRef={marsRef}
            jupiterRef={jupiterRef}
            saturnRef={saturnRef}
            uranusRef={uranusRef}
            neptuneRef={neptuneRef}
          />

          {/* Add the PlanetLogger component here */}
          <PlanetLogger
            sunRef={sunRef}
            mercuryRef={mercuryRef}
            venusRef={venusRef}
            earthRef={earthRef}
            marsRef={marsRef}
            jupiterRef={jupiterRef}
            saturnRef={saturnRef}
            uranusRef={uranusRef}
            neptuneRef={neptuneRef}
            section={section}
          />

          <Scroll html>
            <Interface />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}
