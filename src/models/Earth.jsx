import React, {useRef, useEffect} from 'react';
import {useGLTF} from '@react-three/drei';
import EarthModel from '../assets/3d/Earth.glb';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';

const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

const Earth = (props) => {
    const {nodes, materials} = useGLTF(EarthModel);
      const ref = props.earthRef;

    
    const semiMajorAxis = 1496; 
    const eccentricity = 0.017; 
    const speed = 2 * Math.PI / 365.25; 
    const inclination = degreesToRadians(0);
    const scaleFactor = 6;



    const createOrbitLine = () => {
        const orbitPoints = [];
        const numPoints = 100;

        for (let i = 0; i <= numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const distance = semiMajorAxis * (1 - eccentricity * Math.cos(angle)) * scaleFactor;

            const x = distance * Math.cos(angle);
            const z = distance * Math.sin(angle) * Math.cos(inclination);
            const y = distance * Math.sin(angle) * Math.sin(inclination);

            orbitPoints.push(new THREE.Vector3(x, y, z));
        }

        return new THREE.BufferGeometry().setFromPoints(orbitPoints);
    };

    const orbitGeometry = createOrbitLine();
    const orbitMaterial = new THREE.LineBasicMaterial({color: 0x3399ff});
    const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);



    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const trueAnomaly = speed * time;

        const distance = semiMajorAxis * scaleFactor*(1 - eccentricity * Math.cos(trueAnomaly)) ;

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
                geometry={nodes.Cube001.geometry}
                material={materials['Default OBJ']}
                position={[0, 0, 0]}
                scale={0.012756 * (scaleFactor)**2}
            />
        </group>
    );
};

export default Earth;
