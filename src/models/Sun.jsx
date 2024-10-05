import React, {useRef} from 'react';
import {useGLTF} from '@react-three/drei';
import Sun from '../assets/3d/sun.glb';

const SunModel = (props) => {
    const {nodes, materials} = useGLTF(Sun);
    const lightRef = useRef();

    return (
        <group {...props} dispose={null}>
            <mesh
                geometry={nodes.Cube001.geometry}
                material={materials.None}
                scale={600}
                castShadow
            />
            <pointLight
                ref={lightRef}
                intensity={10}
                distance={50000}
                decay={2}
                position={[0, 0, 0]}
                castShadow
                shadow-bias={-1} 
            />
        </group>
    );
};

export default SunModel;
