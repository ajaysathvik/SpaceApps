import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import MuercuryModel from "../assets/3d/Mercury.glb";
import { motion } from 'framer-motion-3d';
import { useFrame } from '@react-three/fiber';

const Mercury = ({ section }) => {
    const { nodes, materials } = useGLTF(MuercuryModel);
    const ref = useRef();

    const orbitRadius = 500;
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
                geometry={nodes.Cube008.geometry}
                material={materials['Default OBJ']}
            />
        </motion.group>
    );
};
export default Mercury;