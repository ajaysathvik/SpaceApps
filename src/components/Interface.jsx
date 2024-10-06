import { useFrame ,useThree} from '@react-three/fiber';
import React,{useState} from 'react';
import { TiMediaRecord } from "react-icons/ti";
import Title from './Title';


import * as THREE from 'three';



const Section = ({ children }) => (
  <section className="h-screen w-screen max-w-screen mx-auto pt-32 flex flex-col items-start text-white">
    {children}
  </section>
);

export const Interface = (props) => {
  const { camera } = useThree();
  const {
    sunRef,
    mercuryRef,
    venusRef,
    earthRef,
    marsRef,
    jupiterRef,
    saturnRef,
    uranusRef,
    neptuneRef,
  } = props;
x
  const handleClick = (ref) => {
    if (ref.current) {
      // Set the camera position to the planet's position
      const position = ref.current.position;
      camera.position.set(position.x, position.y, position.z + 5); // Adjust camera position as needed
      camera.lookAt(position); // Make the camera look at the planet
    }
  };

  const [orbitVisible, setOrbitVisible] = useState(true);
  const toggleOrbitLines = () => {
    setOrbitVisible((prev) => !prev);
  };

  const planets = [
    { name: "Sun", ref: sunRef },
    { name: "Mercury", ref: mercuryRef },
    { name: "Venus", ref: venusRef },
    { name: "Earth", ref: earthRef },
    { name: "Mars", ref: marsRef },
    { name: "Jupiter", ref: jupiterRef },
    { name: "Saturn", ref: saturnRef },
    { name: "Uranus", ref: uranusRef },
    { name: "Neptune", ref: neptuneRef },
  ];
  const [active, setActive] = useState(planets[0].ref);
  useFrame(() => {
    const { x, y, z } = active.current.position;

    
    camera.position.set(x , y+20 , z-850 ); 
    // camera.lookAt(active.current.position); 
  });

  console.log(active);

  const myList = planets.map(({ name, ref }) => (

      <div
          key={name}
          className="group pl-10 flex flex-col justify-center items-center transition duration-300"
         
            onClick={() => setActive(ref)}
         
      >
        <TiMediaRecord className="text-4xl group-hover:text-6xl transition duration-300"/>
        <p className="text-lg group-hover:text-2xl transition duration-300">
          {name}
        </p>
        <button onClick={toggleOrbitLines} className="mt-2 p-2 bg-blue-500 rounded">
          {orbitVisible ? "Hide Orbit Lines" : "Show Orbit Lines"}
        </button>
      </div>

  ));

  return (
      <>
        <Section>
          <div className="flex items-center w-full justify-center">
            {/* <h1 className="text-6xl font-thin">Let's Begin Our Journey</h1> */}
            <Title />
        </div>
      </Section>
      <Section>
        <div className="w-full h-full flex justify-end items-end">
          <div className="flex flex-row w-full justify-center pt-10">
            {myList}
          </div>
        </div>
      </Section>
    </>
  );
};