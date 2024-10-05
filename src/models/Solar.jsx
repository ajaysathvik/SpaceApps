import React from "react";
import Earth from "./Earth";
import Jupiter from "./Jupiter";
import Mars from "./Mars";
import Mercury from "./Mercury";
import Venus from "./Venus"
import Saturn from "./Saturn"
import Neptune from "./Neptune"
import Uranus from "./Uranus"

const Solar = (props) => {
  return (
    <group {...props} dispose={null}>
    {/* Adjusted scale and positions for planets to fit the screen */}
    <Mercury position={[-20, 0, 0]} scale={[0.5, 0.5, 0.5]} />
    <Venus position={[-40, 0, 0]} scale={[0.7, 0.7, 0.7]} />
    <Earth position={[-60, 0, 0]} scale={[0.7, 0.7, 0.7]} />
    <Mars position={[-80, 0, 0]} scale={[0.6, 0.6, 0.6]} />
    <Jupiter position={[-120, 0, 0]} scale={[2, 2, 2]} />
    <Saturn position={[-160, 0, 0]} scale={[1.7, 1.7, 1.7]} />
    <Uranus position={[-190, 0, 0]} scale={[1.4, 1.4, 1.4]} />
    <Neptune position={[-220, 0, 0]} scale={[1.3, 1.3, 1.3]} />
  </group>
  );
};

export default Solar;
