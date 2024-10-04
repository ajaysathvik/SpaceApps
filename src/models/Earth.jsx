import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import earth from '../assets/3d/Earth.glb'
import { motion } from 'framer-motion-3d'
import { useThree } from '@react-three/fiber'
const Earth =(props) =>{
  const {section} = props;
  const {viewport} = useThree()
  console.log(section)
  
  const { nodes, materials } = useGLTF(earth)
  return (
    <motion.group {...props} dispose={null}
    animate={{
      z:section===1?-1000:200,
      y:section===1?0-viewport.height:-1000,
    }}
    
    >
      <mesh
        geometry={nodes.Cube001.geometry}
        material={materials['Default OBJ']}
      />
    </motion.group>
  )
}

export default Earth;

