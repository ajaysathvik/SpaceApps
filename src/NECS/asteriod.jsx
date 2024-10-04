import React, { useState, useEffect } from 'react';

const AsteroidData = () => {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from NASA/JPL NHATS API
    fetch('https://ssd-api.jpl.nasa.gov/nhats.api')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log the data to inspect the response structure
        if (data.data) {
          setAsteroids(data.data); // Make sure this matches the actual response
        } else {
          throw new Error('Unexpected API response structure');
        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>NASA/JPL NHATS Asteroid Data</h1>
      {asteroids.map((asteroid, index) => (
        <div key={index}>
          <h3>{asteroid.fullname ? asteroid.fullname : asteroid.des}</h3>
          <p><strong>Orbit ID:</strong> {asteroid.orbit_id}</p>
          <p><strong>Magnitude (h):</strong> {asteroid.h}</p>
          <p><strong>Min Duration (Days):</strong> {asteroid.min_dur.dur}</p>
          <p><strong>Delta-V (dv km/s):</strong> {asteroid.min_dur.dv}</p>
          <p><strong>Observation Start:</strong> {asteroid.obs_start ? asteroid.obs_start : 'N/A'}</p>
          <p><strong>Observation End:</strong> {asteroid.obs_end ? asteroid.obs_end : 'N/A'}</p>
          <p><strong>Min Size (m):</strong> {asteroid.min_size}</p>
          <p><strong>Max Size (m):</strong> {asteroid.max_size}</p>
          <p><strong>Occultation Events:</strong> {asteroid.occ}</p>
        </div>
      ))}
    </div>
  );
};

export default AsteroidData;
