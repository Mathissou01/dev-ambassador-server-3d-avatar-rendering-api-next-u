import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        earrings001: THREE.Mesh;
    };
    materials: {
        ACCESSORIES_black: THREE.MeshStandardMaterial;
    };
};

export function Earings1(props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/GLB/Earings/earings1.glb") as GLTFResult;
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.earrings001.geometry}
                material={materials.ACCESSORIES_black}
            />
        </group>
    );
}

useGLTF.preload("/GLB/Earings/earings1.glb");
