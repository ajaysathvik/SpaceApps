import React, { useRef, useState, useCallback } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, ScrollControls, Scroll, Stars } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import SolarSystem from "./models/Solar";
import { ScrollManager } from "./components/ScrollManager";
import { Interface } from "./components/Interface";


export default function App() {
  const [section, setSection] = useState(0);

  
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

          <pointLight position={[0, 0, 600]} intensity={1000} distance={10000} decay={2} color="white" castShadow />
          <color attach="background" args={["#000000"]} />
          <Stars radius={80} depth={3000} count={5000} factor={60} saturation={5} fade speed={0.1} /> 
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
          <Scroll html>
            <Interface
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
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}