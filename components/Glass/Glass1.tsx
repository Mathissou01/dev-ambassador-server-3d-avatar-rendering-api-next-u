import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        glass001: THREE.Mesh;
        frame001: THREE.Mesh;
    };
    materials: {
        ["GLASS.001"]: THREE.MeshPhysicalMaterial;
        ["FRAME.001"]: THREE.MeshStandardMaterial;
    };
};

export function Glass1(props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/GLB/Glass/glass1.glb") as GLTFResult;
    return (
        <group {...props} dispose={null} castShadow={true} receiveShadow={true}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.glass001.geometry}
                material={materials["GLASS.001"]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.frame001.geometry}
                material={materials["FRAME.001"]}
            />
        </group>
    );
}

useGLTF.preload("/GLB/Glass/glass1.glb");
