import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    LeaderboardBody: THREE.Mesh
    LeaderboardTopPlate: THREE.Mesh
    LeaderboardChiffre: THREE.Mesh
  }
  materials: {
    ['Material0-material.001']: THREE.MeshStandardMaterial
    ['Material1-material.001']: THREE.MeshStandardMaterial
    ['Material3-material.001']: THREE.MeshStandardMaterial
  }
}

export default function Podium(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/GLB/Podium/Podium.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh castShadow={true} receiveShadow={true} geometry={nodes.LeaderboardBody.geometry} material={materials['Material0-material.001']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh castShadow={true} receiveShadow={true} geometry={nodes.LeaderboardTopPlate.geometry} material={materials['Material1-material.001']} rotation={[Math.PI / 2, 0, 0]} />
      <mesh castShadow={true} receiveShadow={true} geometry={nodes.LeaderboardChiffre.geometry} material={materials['Material3-material.001']} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/GLB/Podium/Podium.glb')
