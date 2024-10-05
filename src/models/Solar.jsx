import React from 'react';
import SunModel from './Sun.jsx';
import Earth from './Earth';
// import Uranus from "./Uranus.jsx";
import Jupiter from "./Jupiter.jsx";
// import Venus from "./Venus.jsx";
import Mercury from "./Mercury.jsx";

const SolarSystem = ({ section }) => {
    return (
        <>
            <SunModel position={[0, 0, 0]}/>
            <Earth section={section}/>
            <Uranus position={[500,500,500]}/>
            <Jupiter position={[500,500,500]}/>
            <Mercury position={[1500,1500,1500]} />
            {/*<Venus section={section}/>*/}

        </>
    );
};

export default SolarSystem;
