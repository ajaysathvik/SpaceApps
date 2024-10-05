import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import SaturnsModel from '../assets/3d/Saturn.glb'
const Saturn =(props) =>{
  const { nodes, materials } = useGLTF(SaturnsModel )
  return (
    <group {...props} dispose={null}>
      <mesh

        geometry={nodes.Saturn001.geometry}
        material={materials.None}
      />
      <mesh
        geometry={nodes.RingsTop.geometry}
        material={materials.SaturnRings}
      />
      <mesh
        geometry={nodes.RingsBottom.geometry}
        material={materials.SaturnRings}
      />
    </group>
  )
}
export default Saturn;
