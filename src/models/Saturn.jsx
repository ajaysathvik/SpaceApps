

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import SaturnsModel from '../assets/3d/Saturn.glb'
const Saturn =(props) =>{
  const { nodes, materials } = useGLTF(SaturnsModel )
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Saturn001.geometry}
        material={materials.None}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RingsTop.geometry}
        material={materials.SaturnRings}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.RingsBottom.geometry}
        material={materials.SaturnRings}
      />
    </group>
  )
}
export default Saturn;
