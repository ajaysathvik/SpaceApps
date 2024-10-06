import React, {useRef, useEffect} from "react";
import {useGLTF} from "@react-three/drei";
import VenusModel from "../assets/3d/Venus.glb";
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';

const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;


const Venus = (props) => {
    const {nodes, materials} = useGLTF(VenusModel);
     const ref = props.venusRef;

    const semiMajorAxis = 108.2;
    const eccentricity = 0.007;
    const orbitalPeriod = 224.7;
    const speed = 2 * Math.PI / orbitalPeriod;
    const inclination = degreesToRadians(3.4);


    const scaleFactor = 50;


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
        <group ref={ref} dispose={null}>
            <mesh
                geometry={nodes.cylindrically_mapped_sphere.geometry}
                material={materials['Default OBJ.001']}
                scale={0.012104 * (scaleFactor)**0.83}
            />
        </group>
    );
};

export default Venus;
