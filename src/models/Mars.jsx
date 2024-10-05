import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Mars=(props)=> {
  const { nodes, materials } = useGLTF('/Mars.glb')
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

useGLTF.preload('/Mars.glb');
export default Mars;