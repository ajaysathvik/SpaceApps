import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import Sun from '../assets/3d/sun.glb'
const SunModel=(props)=> {

    const { nodes, materials } = useGLTF(Sun)

    return (
        <group ref={props.sunRef} {...props} dispose={null}  scale={3000}>
            <mesh
            
                geometry={nodes.Cube001.geometry}
                material={materials.None}
               
                castShadow
            />
          
        </group>
    );
};

export default SunModel;

