import React from 'react';
import SunModel from './Sun.jsx';
import Earth from './Earth';
import Uranus from "./Uranus.jsx";
import Jupiter from "./Jupiter.jsx";
import Venus from "./Venus.jsx";
import Mercury from "./Mercury.jsx";
import Mars from "./Mars.jsx";
import Neptune from "./Neptune.jsx";
import Saturn from "./Saturn.jsx";

const SolarSystem = ({ section }) => {
    return (
        <>
            <SunModel position={[0, 0, 0]} />
            <Mercury position={[0, 0, 0]} />
            <Venus position={[0, 0, 0]}  />
            <Earth position={[0, 0, 0]} />
            <Mars position={[0, 0, 0]}  />
            <Jupiter position={[0, 0, 0]}  />
            <Saturn position={[0, 0, 0]} />
            <Uranus position={[0, 0, 0]} />
            <Neptune position={[0, 0, 0]} />
        </>
    );
};

export default SolarSystem;
