import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import asteroidData from "../data/b67r-rgxc.json";
import * as THREE from 'three';
import ast from '../assets/3d/asteroid.glb';
import { useGLTF } from "@react-three/drei";

const Asteroid = () => {
  const { nodes, materials } = useGLTF(ast);
  const asteroidRefs = useRef(asteroidData.map(() => React.createRef()));
  const orbitLines = useRef([]);

  const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

  const scaleFactor = 30000;
  const offset = 4000;

  // Define a speed factor (adjust this value to control the speed)
  const speedFactor = 0.001; // Decrease this value to slow down the asteroids

  const createOrbitLine = (asteroidInfo) => {
    const eccentricity = parseFloat(asteroidInfo.e);
    const inclination = degreesToRadians(parseFloat(asteroidInfo.i_deg));
    const semiMajorAxis = parseFloat(asteroidInfo.q_au_1) * scaleFactor;

    const orbitPoints = [];
    const numPoints = 100;

    for (let i = 0; i <= numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const distance = semiMajorAxis * (1 - eccentricity * Math.cos(angle));

      const x = distance * (Math.cos(angle) * Math.cos(inclination));
      const z = distance * (Math.sin(angle) * Math.cos(inclination));
      const y = distance * Math.sin(inclination);

      const offsetX = x + (offset + 1000);
      const offsetY = y;
      const offsetZ = z + (offset + 1000);

      orbitPoints.push(new THREE.Vector3(offsetX, offsetY, offsetZ));
    }

    return new THREE.BufferGeometry().setFromPoints(orbitPoints);
  };

  useFrame((state) => {
    asteroidData.forEach((asteroidInfo, index) => {
      const eccentricity = parseFloat(asteroidInfo.e);
      const inclination = degreesToRadians(parseFloat(asteroidInfo.i_deg));
      const semiMajorAxis = parseFloat(asteroidInfo.q_au_1) * scaleFactor;
      const orbitalPeriod = parseFloat(asteroidInfo.p_yr);
      const speed = (2 * Math.PI) / orbitalPeriod * speedFactor; // Apply the speed factor

      const phaseOffset = Math.random() * Math.PI * 2;
      const time = state.clock.getElapsedTime();
      const trueAnomaly = speed * time + phaseOffset;

      const distance = semiMajorAxis * (1 - eccentricity * Math.cos(trueAnomaly));

      const x = distance * (Math.cos(trueAnomaly) * Math.cos(inclination));
      const z = distance * (Math.sin(trueAnomaly) * Math.cos(inclination));
      const y = distance * Math.sin(inclination);

      const offsetX = x + (offset + 1000);
      const offsetY = y;
      const offsetZ = z + (offset + 1000);

      if (asteroidRefs.current[index].current) {
        asteroidRefs.current[index].current.position.set(offsetX, offsetY, offsetZ);
      }
    });
  });

  return (
      <>
        {asteroidData.map((asteroidInfo, index) => (
            <group key={asteroidInfo.object_name} ref={asteroidRefs.current[index]} dispose={null}>
              <mesh
                  onClick={() => { console.log(asteroidInfo.object_name) }}
                  geometry={nodes.itokawa_LP.geometry}
                  material={materials.itokawa}
              />
            </group>
        ))}
      </>
  );
};

export default Asteroid;
