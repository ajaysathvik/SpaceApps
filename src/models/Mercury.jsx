import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import MercuryModel from "../assets/3d/Mercury.glb";
import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import { calculateOrbitParameters, createOrbitGeometry, updatePlanetPosition } from '../utils/OrbitFuncs'; // Adjust the path as needed
import * as THREE from 'three';

const Mercury = (props) => {
    const { nodes, materials } = useGLTF(MercuryModel);
    const ref = props.mercuryRef;

    // Mercury's orbital parameters
    const perihelion = 4.60;
    const aphelion = 6.98;
    const eccentricity = 0.206;

    // Calculate semi-major and semi-minor axes
    const { semiMajorAxis, semiMinorAxis } = calculateOrbitParameters(perihelion, aphelion, eccentricity);
    const speed = 2;

    // Create orbit geometry
    const orbitGeometry = createOrbitGeometry(semiMajorAxis, semiMinorAxis);
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffff99 });
    const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);

    useEffect(() => {
        ref.current.add(orbitLine); // Add orbit line to the scene
    }, []);

    useFrame((state) => {
        updatePlanetPosition(ref, semiMajorAxis, semiMinorAxis, speed, state.clock.getElapsedTime());
    });

    return (
        <motion.group ref={ref} dispose={null}>
            <mesh
            receiveShadow
            castShadow
                geometry={nodes.Cube008.geometry}
                material={materials['Default OBJ.005']}
                position={[0, 0, 0]}
                scale={0.004879}

        

            />
        </motion.group>

    );
};

export default Mercury;
