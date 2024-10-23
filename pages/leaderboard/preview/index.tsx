'use client'
import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Loader, PerspectiveCamera } from '@react-three/drei'
import BodyRigged from '@/components/BodyRigged'
import Podium from '@/components/Podium/Podium'
import styles from './leaderboard-preview.module.css'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { editable as e, SheetProvider } from '@theatre/r3f'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { getProject } from '@theatre/core'

studio.initialize()
studio.extend(extension)

export default function Preview() {
  const defaultAnimationFirst = 'Standart.FemalePose'
  const defaultSkinFirst = 'DARK'
  const defaultAnimationSecond = 'Standart.SittingPose'
  const defaultSkinSecond = 'DARK-DARK'
  const defaultAnimationThird = 'Standart.RunPose'
  const defaultSkinThird = 'YELLOW'
  const [material, set] = useState()

  return (
    <>
      <Loader />
      <Canvas className={styles.canvasStyle} shadows>
        <Suspense fallback={null}>
          <SheetProvider sheet={getProject('Demo Project').sheet('Demo Sheet')}>
            <Environment preset="sunset" />
            <color attach="background" args={['#202020']} />
            <fog attach="fog" args={['#202020', 5, 20]} />
            <PerspectiveCamera makeDefault fov={50} position={[0, 1.5, 10]} />
            <ambientLight intensity={0.9} />
            <spotLight castShadow color="#cd7f32" decay={-1} distance={20} intensity={0.8} angle={0.33} penumbra={1} position={[11.787, 6.121, 0]} shadow-bias={-0.0001} />
            <spotLight color="#ffd700" decay={-1} intensity={0.8} angle={0.3} penumbra={1} castShadow position={[0, 7.4, 0]} shadow-bias={-0.0001} />
            <spotLight color="#c0c0c0" distance={20} decay={-1} intensity={0.8} angle={0.33} penumbra={1} castShadow position={[-11.29, 4.455, 0]} shadow-bias={-0.0001} />
            <EffectComposer disableNormalPass multisampling={8}>
              {/*<DepthOfField focusDistance={0.5} focalLength={0.02} bokehScale={2} height={480} />*/}
              <Bloom intensity={0.6} luminanceThreshold={0.2} luminanceSmoothing={1} height={800} />
              <Noise opacity={0.01} />
              <Vignette eskil={false} offset={0.1} darkness={0.9} />
            </EffectComposer>
            {/* Le gagnant au centre, légèrement surélevé */}
            <group position={[0, 1.55, 0]}>
              {/*// @ts-ignore*/}
              <BodyRigged key="avatar1" defaultAnimation={defaultAnimationFirst} defaultSkin={defaultSkinFirst} />
            </group>
            {/* Le deuxième à gauche, un peu plus bas */}
            <group position={[-3, -0.15, 0]}>
              {/*// @ts-ignore*/}
              <BodyRigged key="avatar2" defaultAnimation={defaultAnimationSecond} defaultSkin={defaultSkinSecond} />
            </group>
            {/* Le troisième à droite, un peu plus bas */}
            <group position={[3, 0.6, 0]}>
              {/*// @ts-ignore*/}
              <BodyRigged key="avatar3" defaultAnimation={defaultAnimationThird} defaultSkin={defaultSkinThird} />
            </group>
            <Podium rotation={[0, -1.57, 0]} scale={3} />
          </SheetProvider>
        </Suspense>
      </Canvas>
    </>
  )
}
