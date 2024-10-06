import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
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
  } = props;
  const groupRef = useRef();
  const scroll = useScroll();

  const solarSystemPosition = [0, -500, 0];

  useFrame(() => {
    //aminating the solar system
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
      <SunModel position={[0, 0, 0]} sunRef={sunRef} />
      <Mercury position={[0, 0, 0]} mercuryRef={mercuryRef} />
      <Venus position={[0, 0, 0]} venusRef={venusRef} />
      <Earth position={[0, 0, 0]} earthRef={earthRef} />
      <Mars position={[0, 0, 0]} marsRef={marsRef} />
      <Jupiter position={[0, 0, 0]} jupiterRef={jupiterRef} />
      <Saturn position={[0, 0, 0]} saturnRef={saturnRef} />
      <Uranus position={[0, 0, 0]} uranusRef={uranusRef} />
      <Neptune position={[0, 0, 0]} neptuneRef={neptuneRef} />
    </group>
  );
};

export default SolarSystem;
