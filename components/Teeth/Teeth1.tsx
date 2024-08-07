import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        teeth001: THREE.Mesh;
    };
    materials: {
        ["SKIN FACE BODY LIGHT"]: THREE.MeshStandardMaterial;
    };
};

export function Teeth1(props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/GLB/teeth1.glb") as GLTFResult;
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow={true}
                receiveShadow={true}
                geometry={nodes.teeth001.geometry}
                material={materials["SKIN FACE BODY LIGHT"]}
            />
        </group>
    );
}

useGLTF.preload("/GLB/teeth1.glb");
