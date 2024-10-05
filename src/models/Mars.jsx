import React, {useRef, useEffect} from "react";
import {useGLTF} from "@react-three/drei";
import MarsModel from "../assets/3d/Mars.glb";
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';

const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

const Mars = () => {
    const {nodes, materials} = useGLTF(MarsModel);
    const ref = useRef();

    
    const semiMajorAxis = 2279; 
    const eccentricity = 0.093; 
    const speed = 2 * Math.PI / 687; 
    const inclination = degreesToRadians(1.85); 

    
    const createOrbitLine = () => {
        const orbitPoints = [];
        const numPoints = 100;

        for (let i = 0; i <= numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const distance = semiMajorAxis * (1 - eccentricity * Math.cos(angle));

            const x = distance * Math.cos(angle);
            const z = distance * Math.sin(angle) * Math.cos(inclination);
            const y = distance * Math.sin(angle) * Math.sin(inclination);

            orbitPoints.push(new THREE.Vector3(x, y, z));
        }

        return new THREE.BufferGeometry().setFromPoints(orbitPoints);
    };

    const orbitGeometry = createOrbitLine();
    const orbitMaterial = new THREE.LineBasicMaterial({color: 0xff4500}); 
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

        const distance = semiMajorAxis * (1 - eccentricity * Math.cos(trueAnomaly));

        const x = distance * Math.cos(trueAnomaly);
        const z = distance * Math.sin(trueAnomaly) * Math.cos(inclination);
        const y = distance * Math.sin(trueAnomaly) * Math.sin(inclination);

        if (ref.current) {
            ref.current.position.set(x, y, z);
        }
    });

    return (
        <group ref={ref} dispose={null}>
            <mesh
                geometry={nodes.Cube008.geometry}
                material={materials['Default OBJ.005']}
                scale={0.006792} 
            />
        </group>
    );
};

export default Mars;