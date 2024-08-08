import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        eyes000: THREE.Mesh;
    };
    materials: {
        ["SKIN FACE BODY LIGHT"]: THREE.MeshStandardMaterial;
    };
};

export function Eye1(props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/GLB/Eye/eye1.glb") as GLTFResult;
    return (
        <group {...props} dispose={null} castShadow={true} receiveShadow={true}>
            <mesh
                castShadow={true}
                receiveShadow={true}
                geometry={nodes.eyes000.geometry}
                material={materials["SKIN FACE BODY LIGHT"]}
            />
        </group>
    );
}

useGLTF.preload("/GLB/Eye/eye1.glb");