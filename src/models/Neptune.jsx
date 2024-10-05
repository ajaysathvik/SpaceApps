
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
const Neptune =(props)=> {
  const { nodes, materials } = useGLTF('/Neptune.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Neptune.geometry}
        material={materials['Default OBJ.001']}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/Neptune.glb');
export default Neptune;