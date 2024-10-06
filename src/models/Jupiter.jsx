import React, {useRef, useEffect} from "react";
import {useGLTF} from "@react-three/drei";
import JupiterModel from "../assets/3d/Jupiter.glb";
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;
const Jupiter = (props) => {
    const {nodes, materials} = useGLTF(JupiterModel);
    const ref = props.jupiterRef


    const semiMajorAxis = 7785;
    const eccentricity = 0.049;
    const speed = 2 * Math.PI / 4331;
    const inclination = degreesToRadians(1.3);
    const scaleFactor = 4;


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
    const orbitMaterial = new THREE.LineBasicMaterial({color: 0xffd700});
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
        <group ref={ref} dispose={null}  scale={0.142984 * (scaleFactor)**2}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.cubemap.geometry}
                material={materials.None}
                scale={0.142984 * (scaleFactor)**2}
            />
        </group>
    );
};

export default Jupiter;
