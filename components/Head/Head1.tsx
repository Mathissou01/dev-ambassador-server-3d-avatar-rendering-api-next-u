import * as THREE from 'three'
import React, { useLayoutEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    head001: THREE.Mesh
  }
  materials: {
    ['SKIN FACE BODY LIGHT']: THREE.MeshStandardMaterial
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

export function Head1(props: JSX.IntrinsicElements['group'] & { skin_color: number }) {
  const ref = useRef<THREE.Group | null>(null);
  const { nodes, materials, userData, parser } = useGLTF('/GLB/Head/head1.glb') as GLTFResult

  // Apply the selected skin color variant
  useVariant(props.skin_color, ref, parser)

  // console.log("userDataHead", userData)

  return (
    <group {...props} ref={ref} dispose={null} castShadow={true} receiveShadow={true}>
      <mesh castShadow={true} receiveShadow={true} geometry={nodes.head001.geometry} material={materials['SKIN FACE BODY LIGHT']} userData={nodes.head001.userData} />
    </group>
  )
}

useGLTF.preload('/GLB/Head/head1.glb')
