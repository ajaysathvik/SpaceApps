import React, { useRef, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import SunModel from "./Sun";
import Earth from "./Earth";
import Uranus from "./Uranus";
import Jupiter from "./Jupiter";
import Venus from "./Venus";
import Mercury from "./Mercury";
import Mars from "./Mars";
import Neptune from "./Neptune";
import Saturn from "./Saturn";
import Asteroid from "./Asteroid"; 

const SolarSystem = (props) => {
  const {
    sunRef,
    mercuryRef,
    venusRef,
    earthRef,
    marsRef,
    jupiterRef,
    saturnRef,
    uranusRef,
    neptuneRef,
    asteroidRef,
  } = props;
  const groupRef = useRef();
  const scroll = useScroll();

  const solarSystemPosition = [0, -500, 0];

  useFrame(() => {
    if (groupRef.current) {
      const zPosition = -100 + scroll.offset * -800;
      if (scroll.offset < 0.8) {
        const yPosition = -600 + scroll.offset * 800;
        groupRef.current.position.y = yPosition;
      }
      groupRef.current.position.z = zPosition;
    }
  }); 
  return (
    <group ref={groupRef} position={solarSystemPosition}>
      <SunModel position={[0, 0, 0]} sunRef={sunRef} onClick={() => handlePlanetClick(sunRef)} />
      <Mercury position={[0, 0, 0]} mercuryRef={mercuryRef} onClick={() => handlePlanetClick(mercuryRef)} />
      <Venus position={[0, 0, 0]} venusRef={venusRef} onClick={() => handlePlanetClick(venusRef)} />
      <Earth position={[0, 0, 0]} earthRef={earthRef} onClick={() => handlePlanetClick(earthRef)} />
      <Mars position={[0, 0, 0]} marsRef={marsRef} onClick={() => handlePlanetClick(marsRef)} />
      <Jupiter position={[0, 0, 0]} jupiterRef={jupiterRef} onClick={() => handlePlanetClick(jupiterRef)} />
      <Saturn position={[0, 0, 0]} saturnRef={saturnRef} onClick={() => handlePlanetClick(saturnRef)} />
      <Uranus position={[0, 0, 0]} uranusRef={uranusRef} onClick={() => handlePlanetClick(uranusRef)} />
      <Neptune position={[0, 0, 0]} neptuneRef={neptuneRef} onClick={() => handlePlanetClick(neptuneRef)} />
      <Asteroid position={[0, 0, 0]} asteroidRef={asteroidRef} onClick={() => handlePlanetClick(asteroidRef)} />
    </group>
  );
};

export default SolarSystem;
