
import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
    nodes: {
        hair001: THREE.Mesh
    }
    materials: {
        ['HAIR.001']: THREE.MeshStandardMaterial
    }
}

export function Hair1(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/GLB/Hair/hair1.glb') as GLTFResult
    return (
        <group {...props} dispose={null} castShadow={true} receiveShadow={true}>
            <mesh
                castShadow={true}
                receiveShadow={true}
                geometry={nodes.hair001.geometry}
                material={materials['HAIR.001']}
            />
        </group>
    )
}

useGLTF.preload('/GLB/Hair/hair1.glb')
