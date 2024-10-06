import React, {useRef, useEffect} from "react";
import {useGLTF} from "@react-three/drei";
import UranusModel from "../assets/3d/Uranus.glb"; 
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';

const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

const Uranus = (props) => {
    const {nodes, materials} = useGLTF(UranusModel);
     const ref = props.uranusRef;

    
    const semiMajorAxis = 28710; 
    const eccentricity = 0.046; 
    const speed = 2 * Math.PI / 30688; 
    const inclination = degreesToRadians(0.77);
    const scaleFactor = 2.5;

    
    const createOrbitLine = () => {
        const orbitPoints = [];
        const numPoints = 100;


        for (let i = 0; i <= numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const distance = semiMajorAxis *scaleFactor* (1 - eccentricity * Math.cos(angle));

            const x = distance * Math.cos(angle);
            const z = distance * Math.sin(angle) * Math.cos(inclination);
            const y = distance * Math.sin(angle) * Math.sin(inclination);

            orbitPoints.push(new THREE.Vector3(x, y, z));
        }

        return new THREE.BufferGeometry().setFromPoints(orbitPoints);
    };

    const orbitGeometry = createOrbitLine();
    const orbitMaterial = new THREE.LineBasicMaterial({color: 0x00bfff}); 
    const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);



    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const trueAnomaly = speed * time;

        const distance = semiMajorAxis *scaleFactor* (1 - eccentricity * Math.cos(trueAnomaly));

        const x = distance * Math.cos(trueAnomaly);
        const z = distance * Math.sin(trueAnomaly) * Math.cos(inclination);
        const y = distance * Math.sin(trueAnomaly) * Math.sin(inclination);

        if (ref.current) {
            ref.current.position.set(x, y, z);
        }
    });

    return (
        <group {...props} ref={ref} dispose={null}>
            <mesh
                geometry={nodes.Uranus.geometry}
                material={materials['Default OBJ.001']}
                scale={0.051118 * (scaleFactor)**3}
            />
        </group>
    );
};

export default Uranus;
