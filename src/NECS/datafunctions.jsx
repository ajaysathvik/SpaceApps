import React, { useState, useEffect } from 'react';

// Function to calculate the semi-major axis
const calculateSemiMajorAxis = (q_au_1, q_au_2) => {
  return (parseFloat(q_au_1) + parseFloat(q_au_2)) / 2;
};

// Function to calculate orbit length
const calculateOrbitLength = (q_au_1, q_au_2, e) => {
  const a = calculateSemiMajorAxis(q_au_1, q_au_2);
  const b = a * Math.sqrt(1 - e * e);
  return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
};

// Function to calculate comet size (assumed proportional to perihelion distance)
const calculateCometSize = (q_au_1) => {
  return parseFloat(q_au_1) * 1000; // Simple scaling factor for demonstration
};

// Function to calculate speed
const calculateCometSpeed = (q_au_1, q_au_2, p_yr) => {
  const a = calculateSemiMajorAxis(q_au_1, q_au_2); // semi-major axis in AU
  const T = p_yr * 365.25 * 24 * 3600; // convert years to seconds
  return (2 * Math.PI * a * 1.496e+11) / T; // speed in meters per second
};

// Fetch data from NASA API
const fetchCometData = async () => {
  const response = await fetch('https://data.nasa.gov/resource/b67r-rgxc.json');
  const data = await response.json();
  return data;
};

// Main component
const CometInfo = () => {
  const [cometData, setCometData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCometData();
      setCometData(data); // Set the comet data from the API
    };
    getData();
  }, []);

  if (!cometData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {cometData.map((comet) => {
        const { object_name, q_au_1, q_au_2, e, p_yr } = comet;
        const orbitLength = calculateOrbitLength(q_au_1, q_au_2, e);
        const cometSize = calculateCometSize(q_au_1);
        const cometSpeed = calculateCometSpeed(q_au_1, q_au_2, p_yr);

        return (
          <div key={object_name}>
            <h2>{object_name}</h2>
            <p><strong>Orbit Length:</strong> {orbitLength.toFixed(2)} AU</p>
            <p><strong>Comet Size:</strong> {cometSize.toFixed(2)} km</p>


            
            <p><strong>Average Speed:</strong> {cometSpeed.toFixed(2)} m/s</p>
          </div>
        );
      })}
    </div>
  );
};

// Rendering the component
const App = () => {
  return (
    <div>
      <CometInfo />
    </div>
  );
};

export default App;
