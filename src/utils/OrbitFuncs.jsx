import * as THREE from 'three';

export const calculateOrbitParameters = (perihelion, aphelion, eccentricity) => {
    const semiMajorAxis = (perihelion + aphelion) / 2;
    const semiMinorAxis = semiMajorAxis * Math.sqrt(1 - Math.pow(eccentricity, 2));
    return { semiMajorAxis: semiMajorAxis * 100, semiMinorAxis: semiMinorAxis * 100 }; // Convert to the same scale
};

export const createOrbitGeometry = (semiMajorAxis, semiMinorAxis, numPoints = 100) => {
    const orbitPoints = [];
    for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 2;
        const x = semiMajorAxis * Math.cos(angle);
        const z = semiMinorAxis * Math.sin(angle);
        orbitPoints.push(new THREE.Vector3(x, 0, z));
    }
    return new THREE.BufferGeometry().setFromPoints(orbitPoints);
};

export const updatePlanetPosition = (ref, semiMajorAxis, semiMinorAxis, speed, elapsedTime) => {
    const x = semiMajorAxis * Math.cos(elapsedTime * speed);
    const z = semiMinorAxis * Math.sin(elapsedTime * speed);
    if (ref.current) {
        ref.current.position.set(x, 0, z);
    }
};
