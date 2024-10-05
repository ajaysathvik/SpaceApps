import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import SunModel from './Sun'
import Earth from './Earth'
import Uranus from "./Uranus"
import Jupiter from "./Jupiter"
import Venus from "./Venus"
import Mercury from "./Mercury"
import Mars from "./Mars"
import Neptune from "./Neptune"
import Saturn from "./Saturn"

const SolarSystem = ({section}) => {
    return (
        <>
            <SunModel position={[0, 0, 0]}/>
            <Mercury position={[0, 0, 0]}/>
            <Venus position={[0, 0, 0]}/>
            <Earth position={[0, 0, 0]}/>
            <Mars position={[0, 0, 0]}/>
            <Jupiter position={[0, 0, 0]}/>
            <Saturn position={[0, 0, 0]}/>
            <Uranus position={[0, 0, 0]}/>
            <Neptune position={[0, 0, 0]}/>
        </>
    );
};

  return (
    <group ref={groupRef} position={solarSystemPosition}>
      <SunModel position={[0, 0, 0]} />
      <Mercury orbitRadius={orbitalRadii.Mercury} />
      <Venus orbitRadius={orbitalRadii.Venus} />
      <Earth orbitRadius={orbitalRadii.Earth} />
      <Mars orbitRadius={orbitalRadii.Mars} />
      <Jupiter orbitRadius={orbitalRadii.Jupiter} />
      <Saturn orbitRadius={orbitalRadii.Saturn} />
      <Uranus orbitRadius={orbitalRadii.Uranus} />
      <Neptune orbitRadius={orbitalRadii.Neptune} />
    </group>
  )
}

export default SolarSystem