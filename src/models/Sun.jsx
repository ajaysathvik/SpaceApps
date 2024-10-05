
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import Sun from '../assets/3d/sun.glb'
const SunModel=(props)=> {

    const { nodes, materials } = useGLTF(Sun)
    return (
        <group ref={props.sunRef} {...props} dispose={null}>
            <mesh
            
                geometry={nodes.Cube001.geometry}
                material={materials.None}
                scale={600}
               
            />
        </group>
    )
}
export default SunModel;

