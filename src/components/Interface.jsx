import { useFrame, useThree } from '@react-three/fiber';
import React, { useState } from 'react';
import { TiMediaRecord } from "react-icons/ti";
import Planet from './Planet';
import * as THREE from 'three';

const Section = ({ children }) => (
  <section className="h-screen w-screen max-w-screen mx-auto pt-32 flex flex-col items-start text-white">
    {children}
  </section>
);

export const Interface = (props) => {
  const { camera } = useThree();
  const { sunRef, mercuryRef, venusRef, earthRef, marsRef, jupiterRef, saturnRef, uranusRef, neptuneRef } = props;

  const [orbitVisible, setOrbitVisible] = useState(true);
  const toggleOrbitLines = () => {
    setOrbitVisible(prev => !prev);
  };

  const planetsData = [
    {
      name: 'SUN',
      diameter: '1,392,700 km',
      description: 'Centre of our solar system',
      distance: '0 bill. km (It is the Sun)',
      gravity: 'N/A (It’s a star, not a planet)',
      temperature: '15 mill. Celsius at its core',
      moons: '0 moons',
    },
    {
      name: 'MERCURY',
      diameter: '4,880 km',
      orbitalPeriod: '88 days',
      distance: '0.39 bill. km',
      gravity: '0.38 times Earth’s Gravity',
      temperature: '-173°C to 427°C',
      moons: '0 Moons',
    },
    {
      name: 'VENUS',
      diameter: '12,104 km',
      orbitalPeriod: '225 days',
      distance: '0.72 bill. km',
      gravity: '0.91 times Earth’s Gravity',
      temperature: '467°C',
      moons: '0 Moons',
    },
    {
      name: 'EARTH',
      diameter: '12,742 km',
      orbitalPeriod: '1 year',
      distance: '1 bill. km',
      gravity: '1 times Earth’s Gravity',
      temperature: '15°C',
      moons: '1 Moon',
    },
    {
      name: 'MARS',
      diameter: '6,779 km',
      orbitalPeriod: '687 Earth days',
      distance: '1.52 bill. km',
      gravity: '0.38 times Earth’s Gravity',
      temperature: '-80°C',
      moons: '2 Moons',
    },
    {
      name: 'JUPITER',
      diameter: '139,822 km',
      orbitalPeriod: '11.9 years',
      distance: '5.2 bill. km',
      gravity: '2.53 times Earth’s Gravity',
      temperature: '-145°C (no solid surface)',
      moons: '80 Moons',
    },
    {
      name: 'SATURN',
      diameter: '116,464 km',
      orbitalPeriod: '29.5 years',
      distance: '9.58 bill. km',
      gravity: '1.08 times Earth’s Gravity',
      temperature: '-214°C (no solid surface)',
      moons: '80 Moons',
    },
    {
      name: 'URANUS',
      diameter: '50,724 km',
      orbitalPeriod: '84 years',
      distance: '19.22 bill. km',
      gravity: '0.89 times Earth’s Gravity',
      temperature: '-224°C',
      moons: '27 Moons',
    },
    {
      name: 'NEPTUNE',
      diameter: '49,244 km',
      orbitalPeriod: '165 years',
      distance: '30 bill. km',
      gravity: '1.12 times Earth’s Gravity',
      temperature: '-214°C',
      moons: '14 Moons',
    },
  ];

  const planets = [
    { name: "All Planets", ref: null, size: 0 },
    { name: "Sun", ref: sunRef, size: 0.9 },
    { name: "Mercury", ref: mercuryRef, size: -800 },
    { name: "Venus", ref: venusRef, size: 50 },
    { name: "Earth", ref: earthRef, size: 50 },
    { name: "Mars", ref: marsRef, size: 50 },
    { name: "Jupiter", ref: jupiterRef, size: 2000 },
    { name: "Saturn", ref: saturnRef, size: 1000 },
    { name: "Uranus", ref: uranusRef, size: -100 },
    { name: "Neptune", ref: neptuneRef, size: -150 },
  ];

  const [activeIndex, setActiveIndex] = useState(1); // Store active index

  useFrame(() => {
    const activePlanet = planets[activeIndex].ref;
    if (activeIndex === 0) {
      // Position camera for top view of all planets
      camera.position.set(0, 10000, 50000);
      camera.lookAt(0, 0, 0);
      return;
    }

    if (activePlanet && activePlanet.current) {
      const { x, y, z } = activePlanet.current.position;
      const size = activePlanet.current.scale.x;

      const baseDistance = 100;
      const zoomFactor = planets[activeIndex].size;
      const adjustedDistance = baseDistance + size * zoomFactor;

      camera.position.set(x, y, z + adjustedDistance);
      camera.lookAt(activePlanet.current.position);
    }
  });

  const myList = planets.map(({ name, ref }, index) => (
    <div
      key={name}
      className="group pl-10 flex flex-col justify-center items-center transition duration-300 mb-10"
      onClick={() => setActiveIndex(index)} // Use index directly
    >
      <TiMediaRecord className="text-4xl group-hover:text-6xl transition duration-300" />
      <p className="text-lg group-hover:text-2xl transition duration-300">{name}</p>
    </div>
  ));

  return (
    <>
      <Section>
        <div className="flex items-center w-full justify-center">
          <h1 className="text-6xl font-thin">Let's Begin Our Journey</h1>
        </div>
      </Section>
      <Section>
      <div className="w-full h-full flex flex-col justify-end items-end">
          {activeIndex !== 0 && planetsData[activeIndex - 1] && (
            <Planet rightContent={planetsData[activeIndex - 1]} />
          )}
          <div className="flex flex-row w-full justify-center pt-10">
            {myList}
          </div>
        </div>
      </Section>
    </>
  );
};
