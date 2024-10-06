import React from 'react';

const Planet = ({ rightContent }) => {
  return (
    <div className="flex w-full h-screen"> 
    
      <div className=" w-1/3 p-4 flex items-center justify-center">
        <p className="text-white"></p>
      </div>

      <div className=" w-1/3 p-4 flex items-center justify-center">
        <p className="text-white"></p>
      </div>

    
      <div className=" w-1/3 p-4 text-xl text-slate-100 flex items-center justify-center ">
        {rightContent && (
          <div className=" text-left border-l p-3">
            <p><strong>{rightContent.name}</strong></p>
            <p>{rightContent.diameter} Diameter</p>
            {rightContent.orbitalPeriod && <p>{rightContent.orbitalPeriod} Orbital Period</p>}
            <p>{rightContent.distance} Distance from sun</p>
            <p>{rightContent.gravity}</p>
            <p>{rightContent.temperature}</p>
            <p>{rightContent.moons}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Planet;