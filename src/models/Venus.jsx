import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import VenusModel from "../assets/3d/Venus.glb"

const Venus=(props)=> {
  const { nodes, materials } = useGLTF(VenusModel)
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cylindrically_mapped_sphere.geometry}
        material={materials['Default OBJ.001']}
      />
    </group>
  )
}

useGLTF.preload('/Venus.glb');
export default Venus;