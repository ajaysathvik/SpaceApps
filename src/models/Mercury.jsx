import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Mercury=(props)=> {
  const { nodes, materials } = useGLTF('/Mercury.glb')
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

useGLTF.preload('/Mercury.glb');
export default Mercury;
