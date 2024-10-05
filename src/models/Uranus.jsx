import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import UranusModel from "../assets/3d/Uranus.glb"; // Adjust this path if needed
import { motion } from 'framer-motion-3d';
import { useFrame } from '@react-three/fiber';

const Uranus = ({ section }) => {
    let nodes, materials;

    try {
        const result = useGLTF(UranusModel);
        nodes = result.nodes;
        materials = result.materials;
    } catch (error) {
        console.error('Error loading GLTF:', error);
        return null;
    }

    const ref = useRef();

    // Define orbiting properties
    const orbitRadius = 1600;
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
                geometry={nodes.Uranus.geometry}
                material={materials['Default OBJ.001']}/>
                scale={0.000051118}
        </motion.group>
    );
};

export default Uranus;
