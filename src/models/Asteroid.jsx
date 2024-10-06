import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import asteroidData from "../data/b67r-rgxc.json";
import * as THREE from 'three';
import ast from '../assets/3d/asteroid.glb';
import { useGLTF, Text } from "@react-three/drei";

const Asteroid = () => {
  const { nodes, materials } = useGLTF(ast);
  const asteroidRefs = useRef(asteroidData.map(() => React.createRef()));
  const orbitLines = useRef([]);
  const randomOffsets = useRef(asteroidData.map(() => Math.random() * Math.PI * 2));
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);

  const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

  const scaleFactor = 30000;
  const offset = 4000;

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

  useEffect(() => {
    asteroidData.forEach((asteroidInfo, index) => {
      const orbitGeometry = createOrbitLine(asteroidInfo);
      const orbitMaterial = new THREE.LineDashedMaterial({
        color: 0xcccccc,
        linewidth: 1,
        transparent: true,
        opacity: 0.1,
      });
      const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);
      orbitLines.current.push(orbitLine);

      const scene = asteroidRefs.current[index].current.parent;
      scene.add(orbitLine);
    });

    return () => {
      orbitLines.current.forEach(orbitLine => {
        const scene = asteroidRefs.current[0].current.parent;
        scene.remove(orbitLine);
      });
    };
  }, []);

  useFrame((state) => {
    asteroidData.forEach((asteroidInfo, index) => {
      const eccentricity = parseFloat(asteroidInfo.e);
      const inclination = degreesToRadians(parseFloat(asteroidInfo.i_deg));
      const semiMajorAxis = parseFloat(asteroidInfo.q_au_1) * scaleFactor;
      const orbitalPeriod = parseFloat(asteroidInfo.p_yr);
      const speed = (2 * Math.PI) / orbitalPeriod / 10;

      const time = state.clock.getElapsedTime();
      const trueAnomaly = speed * time + randomOffsets.current[index];

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

  const handleAsteroidClick = (asteroidInfo) => {
    setSelectedAsteroid(asteroidInfo === selectedAsteroid ? null : asteroidInfo);
  };

  return (
      <>
        {asteroidData.map((asteroidInfo, index) => (
            <group key={asteroidInfo.object_name} ref={asteroidRefs.current[index]} dispose={null}>
              <mesh
                  onClick={() => handleAsteroidClick(asteroidInfo)}
                  geometry={nodes.itokawa_LP.geometry}
                  material={materials.itokawa}
              />
              {selectedAsteroid === asteroidInfo && (
                  <Text
                      position={[0, 300, 0]} 
                      fontSize={100}
                      color="white"
                      anchorX="center"
                      anchorY="middle"
                      renderOrder={1}
                      depthTest={false}
                  >
                    {asteroidInfo.object_name}
                  </Text>
              )}
            </group>
        ))}
      </>
  );
};

export default Asteroid;