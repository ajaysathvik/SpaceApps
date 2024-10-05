import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import NeptuneModel from '../assets/3d/Neptune.glb'
const Neptune = (props) =>{
  const { nodes, materials } = useGLTF(NeptuneModel)
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

export default Neptune;