import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import SaturnsModel from '../assets/3d/Saturn.glb';
import { useFrame } from "@react-three/fiber";
import { motion } from 'framer-motion-3d';

const Saturn = (props) => {
    const { nodes, materials } = useGLTF(SaturnsModel);
    const ref = useRef();

    // Define orbiting properties
    const orbitRadius = 1500;
    const speed = 0.02;

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const x = orbitRadius * Math.cos(time * speed);
        const z = orbitRadius * Math.sin(time * speed);

        if (ref.current) {
            ref.current.position.set(x, 0, z);
        }
    });

    return (
        <motion.group ref={ref} {...props} dispose={null}>
            <mesh
                geometry={nodes.Saturn001.geometry}
                material={materials.None}
                scale={[0.120536, 0.120536, 0.120536]}
            />
            <mesh
                geometry={nodes.RingsTop.geometry}
                material={materials.SaturnRings}
                scale={[0.120536, 0.120536, 0.120536]}
            />
            <mesh
                geometry={nodes.RingsBottom.geometry}
                material={materials.SaturnRings}
                scale={[0.120536, 0.120536, 0.120536]}
            />
        </motion.group>
    );
}

export default Saturn;
