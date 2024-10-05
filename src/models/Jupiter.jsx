import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import JupiterModel from "../assets/3d/Jupiter.glb"; // Adjust this path if needed
import { motion } from 'framer-motion-3d';
import { useFrame } from '@react-three/fiber';

const Jupiter = (props) => {
    let nodes, materials;

    try {
        const result = useGLTF(JupiterModel);
        nodes = result.nodes;
        materials = result.materials;

    } catch (error) {
        console.error('Error loading GLTF:', error);
        return null;
    }

    const ref = props.jupiterRef;

    // Define orbiting properties
    const orbitRadius = 1000;
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
        <motion.group ref={ref} dispose={null}>
            <mesh
                geometry={nodes.cubemap.geometry}
                material={nodes.cubemap.material}
                scale={0.142984}
            />
        </motion.group>
    );
};

export default Jupiter;
