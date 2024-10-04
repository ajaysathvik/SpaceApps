import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import earth from '../assets/3d/Earth.glb'
import { a } from '@react-spring/three'; 

const Earth =(props) =>{
  const { nodes, materials } = useGLTF(earth)
  return (
    <a.group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cube001.geometry}
        material={materials['Default OBJ']}
      />
    </a.group>
  )
}

export default Earth;

