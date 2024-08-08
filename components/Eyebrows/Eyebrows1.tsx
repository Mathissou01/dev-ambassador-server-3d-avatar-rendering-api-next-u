import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        eyebrows001: THREE.Mesh
    }
    materials: {
        ['EYEBROWS.001']: THREE.MeshStandardMaterial
    }
}

export function Eyebrows1(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/GLB/Eyebrows/eyebrows1.glb') as GLTFResult
    return (
        <group {...props} dispose={null} castShadow={true} receiveShadow={true}>
            <mesh
                castShadow={true}
                receiveShadow={true}
                geometry={nodes.eyebrows001.geometry}
                material={materials['EYEBROWS.001']}
            />
        </group>
    )
}

useGLTF.preload('/GLB/Eyebrows/eyebrows1.glb')
