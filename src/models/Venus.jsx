import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Venus=(props)=> {
  const { nodes, materials } = useGLTF('/Venus.glb')
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