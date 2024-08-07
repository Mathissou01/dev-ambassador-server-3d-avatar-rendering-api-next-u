'use client'
import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Center, Loader, Stage } from '@react-three/drei'
import BodyRigged from '@/components/BodyRigged'
import { AnimationNames } from '@/utils/animationNames'
import { SkinNames } from '@/utils/skinNames'
import styles from './event-render.module.css'

export default function Preview() {
  return (
    <>
      <Loader />
      <Canvas className={styles.canvasStyle} shadows camera={{ position: [0, 0, 1], fov: 30 }}>
        <Suspense fallback={null}>
          <Stage shadows adjustCamera={1.2} intensity={0.5} environment="sunset" preset="portrait">
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.5} angle={0.3} penumbra={1} position={[0, 25, 0]} shadow-bias={-0.0001} />
            <Center>
              {/*// @ts-ignore*/}
              <BodyRigged />
            </Center>
          </Stage>
        </Suspense>
      </Canvas>
    </>
  )
}
