'use client'
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Loader, PerspectiveCamera } from '@react-three/drei'
import BodyRigged from '@/components/BodyRigged'
import Podium from '@/components/Podium/Podium'
import styles from './leaderboard-preview.module.css'

export default function Preview() {
  const defaultAnimationFirst = 'Standart.FemalePose'
  const defaultSkinFirst = 'DARK'
  const defaultAnimationSecond = 'Standart.SittingPose'
  const defaultSkinSecond = 'DARK-DARK'
  const defaultAnimationThird = 'Standart.RunPose'
  const defaultSkinThird = 'YELLOW'
  return (
    <>
      <Loader />
      <Canvas className={styles.canvasStyle} shadows>
        <Suspense fallback={null}>
          <Environment preset='sunset' />
          <PerspectiveCamera
            makeDefault
            fov={50}
            position={[0, 1.5, 10]}
          />
          <ambientLight intensity={0.5} />
          <spotLight intensity={0.5} angle={0.3} penumbra={1} position={[0, 25, 0]} shadow-bias={-0.0001} />
          {/* Le gagnant au centre, légèrement surélevé */}
          <group position={[0, 1.55, 0]}>
            {/*// @ts-ignore*/}
            <BodyRigged key='avatar1' defaultAnimation={defaultAnimationFirst} defaultSkin={defaultSkinFirst} />
          </group>
          {/* Le deuxième à gauche, un peu plus bas */}
          <group position={[-3, -0.15, 0]}>
            {/*// @ts-ignore*/}
            <BodyRigged key='avatar2' defaultAnimation={defaultAnimationSecond} defaultSkin={defaultSkinSecond} />
          </group>
          {/* Le troisième à droite, un peu plus bas */}
          <group position={[3, 0.6, 0]}>
            {/*// @ts-ignore*/}
            <BodyRigged key='avatar3' defaultAnimation={defaultAnimationThird} defaultSkin={defaultSkinThird} />
          </group>
          <Podium rotation={[0, -1.57, 0]} scale={3} />
        </Suspense>
      </Canvas>
    </>
  )
}
