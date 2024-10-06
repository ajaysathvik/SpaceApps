import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import asteroidData from "../data/b67r-rgxc.json";
import * as THREE from 'three';

const Asteroid = () => {
  const asteroidRefs = useRef(asteroidData.map(() => React.createRef()));

  const degreesToRadians = (degrees) => (degrees * Math.PI) / 180;

  const createOrbitLine = (asteroidInfo) => {
    const eccentricity = parseFloat(asteroidInfo.e);
    const inclination = degreesToRadians(parseFloat(asteroidInfo.i_deg));
    const semiMajorAxis = parseFloat(asteroidInfo.q_au_1) * 10;
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

  useEffect(() => {
    asteroidData.forEach((asteroidInfo, index) => {
      const orbitGeometry = createOrbitLine(asteroidInfo);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xcccccc });
      const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial);

      const scene = asteroidRefs.current[index].current.parent;
      scene.add(orbitLine);

      return () => {
        scene.remove(orbitLine);
      };
    });
  }, []);

  useFrame((state) => {
    asteroidData.forEach((asteroidInfo, index) => {
      const eccentricity = parseFloat(asteroidInfo.e);
      const inclination = degreesToRadians(parseFloat(asteroidInfo.i_deg));
      const semiMajorAxis = parseFloat(asteroidInfo.q_au_1) * 10;
      const orbitalPeriod = parseFloat(asteroidInfo.p_yr);
      const speed = (2 * Math.PI) / orbitalPeriod;

      const time = state.clock.getElapsedTime();
      const trueAnomaly = speed * time;

      const distance = semiMajorAxis * (1 - eccentricity * Math.cos(trueAnomaly));

      const x = distance * Math.cos(trueAnomaly);
      const z = distance * Math.sin(trueAnomaly) * Math.cos(inclination);
      const y = distance * Math.sin(trueAnomaly) * Math.sin(inclination);

      if (asteroidRefs.current[index].current) {
        asteroidRefs.current[index].current.position.set(x, y, z);
      }
    });
  });

  const scale = 0.1;

  return (
    <>
      {asteroidData.map((asteroidInfo, index) => (
        <group key={asteroidInfo.object_name} ref={asteroidRefs.current[index]} dispose={null}>
          <mesh scale={[scale, scale, scale]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color="gray" />
          </mesh>
        </group>
      ))}
    </>
  );
};

export default Asteroid;