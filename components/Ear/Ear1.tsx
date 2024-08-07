import * as THREE from 'three'
import React, { useLayoutEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ears000: THREE.Mesh
  }
  materials: {
    ['SKIN FACE BODY DARK-DARK']: THREE.MeshStandardMaterial
    [key: string]: THREE.MeshStandardMaterial
  }
  userData: {
    gltfExtensions: {
      KHR_materials_variants: {
        variants: Array<{
          name: string
        }>
      }
    }
  }
}

// Convenience hook that selects a KHR material variant
function useVariant(variantIndex: number, ref: React.RefObject<THREE.Group>, parser: any) {
  useLayoutEffect(() => {
    ref.current?.traverse(async (object) => {
      if (!(object instanceof THREE.Mesh) || !object.userData.gltfExtensions) return
      const meshVariantDef = object.userData.gltfExtensions['KHR_materials_variants']
      if (!meshVariantDef) return
      if (!object.userData.originalMaterial) object.userData.originalMaterial = object.material
      const mapping = meshVariantDef.mappings.find((mapping: any) =>
        mapping.variants.includes(variantIndex)
      )
      if (mapping) object.material = await parser.getDependency('material', mapping.material)
    })
  }, [variantIndex, parser, ref])
}

export function Ear1(props: JSX.IntrinsicElements['group'] & { skin_color: number }) {
  const ref = useRef<THREE.Group | null>(null);
  const { nodes, materials, parser } = useGLTF('/GLB/Ear/ear1.glb') as GLTFResult
  // Apply the selected skin color variant
  useVariant(props.skin_color, ref, parser)

  return (
    <group {...props} ref={ref} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.ears000.geometry} material={materials['SKIN FACE BODY DARK-DARK']} userData={nodes.ears000.userData} />
    </group>
  )
}

useGLTF.preload('/GLB/Ear/ear1.glb')
