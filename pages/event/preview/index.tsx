// @ts-ignore
'use client'
import React, { Suspense, useRef } from 'react'
import { getProject } from '@theatre/core'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Float, Loader, Sparkles, Stars, Text3D, useMatcapTexture } from '@react-three/drei'
import BodyRigged from '@/components/BodyRigged'
import { editable as e, PerspectiveCamera, SheetProvider } from '@theatre/r3f'
import styles from './event-preview.module.css'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'

studio.initialize()
studio.extend(extension)

// Function to calculate unique positions for avatars, centered around the X-axis
const calculatePositions = (numAvatars: number, spacing: number = 4): [number, number, number][] => {
  const positions: [number, number, number][] = []
  const centerIndex = Math.floor(numAvatars / 2)
  for (let i = 0; i < numAvatars; i++) {
    const offset = (i - centerIndex) * spacing
    positions.push([offset, 0, 0])
  }
  return positions
}

interface Avatar {
  name: string
  animation: string
  skin: string
}

// Example avatars array
const avatars: Avatar[] = [
  { name: 'Florian', animation: 'Action.StandingHunt', skin: "DARK_DARK" },
  { name: 'Mathis', animation: 'Standart.JumpHighPose', skin: "DARK" },
  { name: 'Adam', animation: 'Standart.HighKickPose', skin: "LIGHT" },
  { name: 'Hasan', animation: 'Standart.JumpHighPose', skin: "DARK" },
  { name: 'Benjamin', animation: 'Action.StandingHunt', skin: "YELLOW" },
  // Add more avatars as needed
]

// Calculate positions for each avatar
const positions = calculatePositions(avatars.length)

interface AvatarRendererProps {
  avatars: Avatar[]
  positions: [number, number, number][]
}

function AvatarRenderer({ avatars, positions }: AvatarRendererProps) {
  const { width: w, height: h } = useThree((state) => state.viewport)
  const [matcapTexture] = useMatcapTexture('161B1F_C7E0EC_90A5B3_7B8C9B')

  // Function to render avatars based on the input array
  const renderAvatars = (avatars: Avatar[], positions: [number, number, number][]) => {
    return avatars.map((avatar, index) => (
      <React.Fragment key={index}>
        <group position={positions[index]}>
          <Float speed={2}>
            <Text3D
              position={[-1.5, 4, 0]}
              scale={[1, 1, 1]}
              size={w / w / 4}
              // @ts-ignore
              maxWidth={[-w / 10, -h * 1.5, 3]}
              font={'/fonts/gt.json'}
              curveSegments={24}
              brevelSegments={1}
              bevelEnabled
              bevelSize={0.02}
              bevelThickness={0.1}
              height={0.1}
              lineHeight={0.5}
              letterSpacing={0.2}
            >
              {avatar.name}
              {/*// @ts-ignore*/}
              <meshMatcapMaterial color='white' matcap={matcapTexture} />
            </Text3D>
          </Float>

          <BodyRigged
            key={index}
            // @ts-ignore
            defaultAnimation={avatar.animation}
            // @ts-ignore
            defaultSkin={avatar.skin}
          />
        </group>
      </React.Fragment>
    ))
  }

  return renderAvatars(avatars, positions)
}

export default function Preview() {
  return (
    <>
      <Loader />
      <Canvas className={styles.canvasStyle} shadows gl={{ preserveDrawingBuffer: true }}>
        <Suspense fallback={null}>
          <SheetProvider sheet={getProject('Demo Project').sheet('Demo Sheet')}>
            <Environment preset='forest' background backgroundBlurriness={0.5} />
            <PerspectiveCamera theatreKey='Camera' makeDefault position={[0, 2, 5]} fov={70} zoom={1} />
            <ambientLight intensity={1} />
            <e.spotLight theatreKey='Spot-Light' intensity={2.5} angle={0.6} penumbra={1} color='white'
                         position={[0, 15, 0]} shadow-bias={-0.0001} />
            {/*// @ts-ignore*/}
            <AvatarRenderer avatars={avatars} positions={positions} />
            <Stars
              radius={100}
              depth={100}
              count={3000}
              factor={4}
              saturation={0}
              fade
              speed={0.6}
            />
            <Sparkles
              count={200}
              size={3}
              speed={0.3}
              opacity={1}
              scale={10}
              color='#fff3b0'
            />
          </SheetProvider>
        </Suspense>
      </Canvas>
    </>
  )
}
