<<<<<<< HEAD

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
=======
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

>>>>>>> 5ef73d360d9f8b36c328f168502547a820084608
export default Neptune;