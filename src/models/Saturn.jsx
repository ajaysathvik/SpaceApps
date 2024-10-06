import React, {useRef, useEffect} from 'react';
import {useGLTF} from '@react-three/drei';
import SaturnModel from '../assets/3d/Saturn.glb'; 
import {useFrame} from "@react-three/fiber";
import * as THREE from 'three';
import SaturnsModel from '../assets/3d/Saturn.glb';

const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

const Saturn = (props) => {


     const { nodes, materials } = useGLTF(SaturnsModel);
    const ref = props.saturnRef;

    
    const semiMajorAxis = 14394; 
    const eccentricity = 0.056; 
    const speed = 2 * Math.PI / 10759; 
    const inclination = degreesToRadians(2.5);
    const scaleFactor = 3.5;

    
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
    const orbitMaterial = new THREE.LineBasicMaterial({color: 0xffcc00}); 
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

        const distance = semiMajorAxis *scaleFactor* (1 - eccentricity * Math.cos(trueAnomaly));

        const x = distance * Math.cos(trueAnomaly);
        const z = distance * Math.sin(trueAnomaly) * Math.cos(inclination);
        const y = distance * Math.sin(trueAnomaly) * Math.sin(inclination);

        if (ref.current) {
            ref.current.position.set(x, y, z);
        }
    });

    return (
        <group ref={ref} {...props} dispose={null} scale={0.120536 * (scaleFactor)**2}>
            <mesh
                geometry={nodes.Saturn001.geometry}
                material={materials.None}
               
            />
            <mesh
                geometry={nodes.RingsTop.geometry}
                material={materials.SaturnRings}
               
            />
            <mesh
                geometry={nodes.RingsBottom.geometry}
                material={materials.SaturnRings}
               
            />
        </group>
    );
}

export default Saturn;
