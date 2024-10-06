import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls, Scroll, Stars } from "@react-three/drei";
import SolarSystem from "./models/Solar";
import { ScrollManager } from "./components/ScrollManager";
import { Interface } from "./components/Interface";

export default function App() {
  const [section, setSection] = useState(0);

  // Create references for each planet
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
      <Canvas camera={{ position: [0, 0, 400], near: 1, far: 500000 }}>

        <ScrollControls pages={2} damping={0.1}>
          <ScrollManager section={section} setSection={setSection} />
          {/* Ambient and Point Lights */}
          <ambientLight intensity={5} />
          <pointLight position={[0, 0, 600]} intensity={100} distance={10000} decay={2} color="white" castShadow />
          
          {/* Background Color */}
          <color attach="background" args={["#000000"]} />

          {/* Orbit Controls for moving around */}
        
          
          {/* Stars Component */}
          <Stars
            radius={80}       // Increase radius for better star spread
            depth={150000}       // Adjust depth for the star field
            count={5000}      // Increase star count for density
            factor={3500}         // Adjust spacing factor between stars
            saturation={5}     // Keep saturation at 0 for white stars
            fade               // Fading effect for stars at distance
            speed={0.1}        // Subtle movement of stars
          />

          {/* Solar System model with planet references */}
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

          {/* Interface for planet selection */}
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
