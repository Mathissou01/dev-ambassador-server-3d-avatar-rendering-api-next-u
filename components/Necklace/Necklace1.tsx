import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    necklace001: THREE.Mesh;
  };
  materials: {
    ["NECKLACE.001"]: THREE.MeshStandardMaterial;
  };
};

export function Necklace1(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/GLB/Necklace/necklace1.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.necklace001.geometry}
        material={materials["NECKLACE.001"]}
      />
    </group>
  );
}

useGLTF.preload("/GLB/Necklace/necklace1.glb");
