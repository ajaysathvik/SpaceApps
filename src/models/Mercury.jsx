import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import MercuryModel from "../assets/3d/Mercury.glb"

const Mercury=(props)=> {
  const { nodes, materials } = useGLTF(MercuryModel)
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={materials['Default OBJ.005']}
      />
    </group>
  )
}


export default Mercury;
