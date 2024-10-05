import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import VenusModel from "../assets/3d/Venus.glb";
import { motion } from 'framer-motion-3d';
import { useFrame } from '@react-three/fiber';

const Venus = ({ section }) => {
    const { nodes, materials } = useGLTF(VenusModel);
    const ref = useRef();

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
        <motion.group ref={ref} dispose={null}>
            <mesh
                geometry={nodes.Cube001.geometry}
                material={materials['Default OBJ']}
            />
        </motion.group>
    );
};

export default Venus;
