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

const SolarSystem = () => {
  const groupRef = useRef()
  const scroll = useScroll()
  
  const orbitalRadii = {
    Mercury: 60,
    Venus: 80,
    Earth: 100,
    Mars: 120,
    Jupiter: 160,
    Saturn: 200,
    Uranus: 240,
    Neptune: 280
  }
  
  const solarSystemPosition = [0, -500, 0]
  
  useFrame(() => {
    
    if (groupRef.current) {
      const zPosition = -100 + scroll.offset * -800
      if(scroll.offset <0.8){
    const yPosition = -600 + scroll.offset * 800  
        groupRef.current.position.y = yPosition
    }
      groupRef.current.position.z = zPosition
    }
  })

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