import React, {useRef, useEffect} from "react";
import {useGLTF} from "@react-three/drei";
import MercuryModel from "../assets/3d/Mercury.glb";

import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import { calculateOrbitParameters, createOrbitGeometry, updatePlanetPosition } from '../utils/OrbitFuncs'; // Adjust the path as needed
import * as THREE from 'three';

const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

const Mercury = (props) => {
    const {nodes, materials} = useGLTF(MercuryModel);
       const ref = props.mercuryRef;


    
    const semiMajorAxis = 579;
    const eccentricity = 0.206;
    const speed = 2 * Math.PI / 88;
    const inclination = degreesToRadians(7);
    const scaleFactor = 5;

    
    const createOrbitLine = () => {
        const orbitPoints = [];
        const numPoints = 100;

        for (let i = 0; i <= numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const distance = semiMajorAxis * scaleFactor * (1 - eccentricity * Math.cos(angle));

            const x = distance * Math.cos(angle);
            const z = distance * Math.sin(angle) * Math.cos(inclination);
            const y = distance * Math.sin(angle) * Math.sin(inclination);

            orbitPoints.push(new THREE.Vector3(x, y, z));
        }

        return new THREE.BufferGeometry().setFromPoints(orbitPoints);
    };

    const orbitGeometry = createOrbitLine();
    const orbitMaterial = new THREE.LineBasicMaterial({color: 0xffff99});
    const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);

    useEffect(() => {
        const scene = ref.current.parent;
        scene.add(orbitLine);
        return () => {
            scene.remove(orbitLine);
        };
    }, [orbitLine]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const trueAnomaly = speed * time;

        const distance = semiMajorAxis * scaleFactor * (1 - eccentricity * Math.cos(trueAnomaly));

        const x = distance * Math.cos(trueAnomaly);
        const z = distance * Math.sin(trueAnomaly) * Math.cos(inclination);
        const y = distance * Math.sin(trueAnomaly) * Math.sin(inclination);

        if (ref.current) {
            ref.current.position.set(x, y, z);
        }
    });

    return (
        <motion.group ref={ref} dispose={null}>
            <mesh
            receiveShadow
            castShadow
                geometry={nodes.Cube008.geometry}
                material={materials['Default OBJ.005']}
                position={[0, 0, 0]}
                scale={0.004879 * (scaleFactor)**2}

        

            />
        </motion.group>

    );
};
export default Mercury;