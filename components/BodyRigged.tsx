// @ts-ignore
import * as THREE from 'three'
import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useGraph } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei'
import { GLTF, SkeletonUtils } from 'three-stdlib'
import { Head1 } from '@/components/Head/Head1'
import { Eye1 } from '@/components/Eye/Eye1'
import { Earings1 } from '@/components/Earings/Earings1'
import { Ear1 } from '@/components/Ear/Ear1'
import { Noose1 } from '@/components/Noose/Noose1'
import { Hair1 } from '@/components/Hair/Hair1'
import { Eyebrows1 } from '@/components/Eyebrows/Eyebrows1'
import { Glass1 } from '@/components/Glass/Glass1'
import { useTweaks } from 'use-tweaks'

type ActionName =
  | 'Action.StandingHunt'
  | 'Standart.Female2Pose'
  | 'Standart.FemalePose'
  | 'Standart.HighKickPose'
  | 'Standart.JumpHighPose'
  | 'Standart.JumpingHighPose'
  | 'Standart.JumpingRunningPose'
  | 'Standart.RunningFastPose'
  | 'Standart.RunPose'
  | 'Standart.SceachPose'
  | 'Standart.SittingPose'
  | 'Standart.SouroundingPose'
  | 'Standart.StandingPose'
  | 'Standart.Tpose'
  | 'Standart.WaitPose'

type SkinColorName = 'Light' | 'Dark-Dark' | 'Dark' | 'Yellow'

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName
}

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.SkinnedMesh & { geometry: THREE.BufferGeometry; skeleton: THREE.Skeleton }
    _rootJoint: THREE.Bone
    Hips: THREE.Bone
    LeftHip: THREE.Bone
    LeftThigh: THREE.Bone
    LeftLeg: THREE.Bone
    RightHip: THREE.Bone
    RightThigh: THREE.Bone
    RightLeg: THREE.Bone
    Waist: THREE.Bone
    Chest: THREE.Bone
    Head: THREE.Bone
    LeftShoulder: THREE.Bone
    LeftArm: THREE.Bone
    LeftForearm: THREE.Bone
    LeftHand: THREE.Bone
    RightShoulder: THREE.Bone
    RightArm: THREE.Bone
    RightForearm: THREE.Bone
    RightHand: THREE.Bone
  }
  materials: {
    ['Body_Light.Skin']: THREE.MeshStandardMaterial
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
  animations: GLTFAction[]
}

// Hook de convenance pour sélectionner un variant de matériel KHR
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

// Définition du composant BodyRigged
interface BodyRiggedProps {
  defaultAnimation: ActionName
  defaultSkin: number
}

export default function BodyRigged({ defaultAnimation, defaultSkin }: BodyRiggedProps) {
  const group = useRef<THREE.Group | null>(null);
  const { scene, animations, parser } = useGLTF('/GLB/Body/Body.glb') as GLTFResult
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  // @ts-ignore
  const { actions } = useAnimations(animations, group)
  const animationNames = animations.map((anim) => anim.name)
  const skinNames = ['LIGHT', 'DARK-DARK', 'DARK', 'YELLOW']

  // Setup useTweaks with initial value from defaultAnimation or the first animation
  // @ts-ignore
  const { pose } = useTweaks(`${defaultAnimation}_pose`, {
    pose: {
      value: defaultAnimation || animationNames[0],
      options: animationNames
    }
  })
  // Create a GUI tweak panel for skin color
  // @ts-ignore
  const { skin_color } = useTweaks({
    skin_color: {
      value: 0,
      options: [
        'Light',
        'Dark-Dark',
        'Dark',
        'Yellow'
        // Add other skin color options as needed
      ].reduce((acc, name, index) => ({ ...acc, [name]: index }), {})
    }
  })

  useEffect(() => {
    if (actions && actions[pose]) {
      Object.values(actions).forEach((action) => action?.stop())
      actions[pose]?.play()
    }
  }, [pose, actions])

  useVariant(skin_color, group, parser)

  // console.log("actions:", actions);
  // console.log("Animations:", animations);
  // console.log("nodes:", nodes);
  // console.log("materials:", materials);
  // console.log("userDataBody", userData)

  return (
    // <e.group theatreKey="Avatar" ref={group} dispose={null} castShadow={true} receiveShadow={true}>
    <group ref={group} dispose={null} castShadow={true} receiveShadow={true}>
      <group name="Scene">
        <group name="Body_Armature" position={[0, 0.516, -0.484]} rotation={[-1.57, 0, 0]} scale={0.025}>
          <primitive object={nodes._rootJoint} name="_rootJoint" position={[0, -30.322, -27.565]}>
            <primitive object={nodes.Hips} name="Hips" position={[0, 34.787, -2.11]}>
              <primitive object={nodes.LeftHip} name="LeftHip" position={[0, 19.426, 0]} rotation={[-2.015, 0.406, -1.477]} />
              <primitive object={nodes.LeftThigh} name="LeftThigh" position={[23, 9.489, 2.122]} rotation={[-Math.PI, 0, 0]}>
                <primitive object={nodes.LeftLeg} name="LeftLeg" position={[0, 22.096, 0]} rotation={[0.001, 0, -0.013]}>
                  <primitive object={nodes.LeftFoot} name="LeftFoot" position={[0, 12.461, 0]} rotation={[-0.001, 0, -0.033]} />
                </primitive>
              </primitive>
              <primitive object={nodes.RightHip} name="RightHip" position={[0, 19.426, 0]} rotation={[-2.015, -0.406, 1.477]} />
              <primitive object={nodes.RightThigh} name="RightThigh" position={[-23, 9.489, 2.122]} rotation={[-Math.PI, 0, 0]}>
                <primitive object={nodes.RightLeg} name="RightLeg" position={[0, 22.096, 0]} rotation={[0.001, 0, 0.013]}>
                  <primitive object={nodes.RightFoot} name="RightFoot" position={[0, 12.461, 0]} rotation={[-0.001, 0, 0.033]} />
                </primitive>
              </primitive>
              <primitive object={nodes.Waist} name="Waist" position={[0, 19.426, 0]} rotation={[-0.008, 0, 0]}>
                <primitive object={nodes.Spine} name="Spine" position={[0, 17.78, 0]} rotation={[-0.011, 0, 0]}>
                  <primitive object={nodes.Chest} name="Chest" position={[0, 14.172, -4.391]} rotation={[-0.133, 0, 0]}>
                    <primitive object={nodes.Head} name="Head" position={[0, 21.463, 0]} rotation={[0.47, 0, 0]}>
                      <group scale={30} position={[0, 23, 0]}>
                        <Eye1 />
                        <Hair1 />
                        <Head1 skin_color={skin_color} />
                        <Ear1 skin_color={skin_color} />
                        <Noose1 skin_color={skin_color} />
                        {/* <Teeth1 /> */}
                        <Earings1 />
                        <Eyebrows1 />
                        <Glass1 />
                      </group>
                    </primitive>
                    <primitive object={nodes.LeftShoulder} name="LeftShoulder" position={[0, 21.463, 0]} rotation={[-1.45, 0.363, -1.565]}>
                      <primitive object={nodes.LeftArm} name="LeftArm" position={[0, 21.391, 0]} rotation={[0.339, 0.03, -0.2]}>
                        <primitive object={nodes.LeftForearm} name="LeftForearm" position={[0, 35.685, 0]} rotation={[0.031, 0.006, 0.195]}>
                          <primitive object={nodes.LeftHand} name="LeftHand" position={[0, 27.873, 0]} rotation={[-0.349, 0, -0.371]} />
                        </primitive>
                      </primitive>
                    </primitive>
                    <primitive object={nodes.RightShoulder} name="RightShoulder" position={[0, 21.463, 0]} rotation={[-1.45, -0.363, 1.565]}>
                      <primitive object={nodes.RightArm} name="RightArm" position={[0, 21.391, 0]} rotation={[0.339, -0.03, 0.2]}>
                        <primitive object={nodes.RightForearm} name="RightForearm" position={[0, 35.685, 0]} rotation={[0.032, -0.006, -0.195]}>
                          <primitive object={nodes.RightHand} name="RightHand" position={[0, 27.874, 0]} rotation={[-0.349, 0, 0.371]} />
                        </primitive>
                      </primitive>
                    </primitive>
                  </primitive>
                </primitive>
              </primitive>
            </primitive>
          </primitive>
        </group>
        <skinnedMesh
          name="Body"
          // @ts-ignore
          geometry={nodes.Body.geometry}
          userData={nodes.Body.userData}
          material={materials['Body_Light.Skin']}
          // @ts-ignore
          skeleton={nodes.Body.skeleton}
          position={[0, 0.516, -0.484]}
          rotation={[-1.57, 0, 0]}
          scale={0.025}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/GLB/Body/Body.glb')
