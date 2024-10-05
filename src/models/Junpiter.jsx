import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import JupiterModel from "../assets/3d/Jupiter.glb";
import { exp } from "three/webgpu";
const Jupiter = (props) => {
  const { nodes, materials } = useGLTF(JupiterModel);
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.cubemap.geometry}
        material={materials.None}
      />
    </group>
  );
};

export default Jupiter;