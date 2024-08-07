/* @ts-ignore */
import { Canvas } from '@react-three/fiber'
import { Caustics, Stage } from '@react-three/drei'
import { Suspense } from 'react'
import { useRouter } from 'next/router'
import { Head1 } from '@/components/Head/Head1'
// import { Head2 } from '../components/Head2';
// import { Head3 } from '../components/Head3';
// import { Head4 } from '../components/Head4';
// import { Head5 } from '../components/Head5';
// import { Head6 } from '../components/Head6';
// import { Head7 } from '../components/Head7';
// import { Head8 } from '../components/Head8';
// import { Head9 } from '../components/Head9';
// import { Head10 } from '../components/Head10';
// import { Head11 } from '../components/Head11';
// import { Head12 } from '../components/Head12';
// import { Neck1 } from '@/components/Neck1';
import { Eye1 } from '@/components/Eye/Eye1'
import { Ear1 } from '@/components/Ear/Ear1'
import { Noose1 } from '@/components/Noose/Noose1'
// import { Noose1 } from '../components/Noose1';
// import { Clothe1 } from '../components/Clothe1';
// import { Clothe2 } from '../components/Clothe2';
// import { Clothe3 } from '../components/Clothe3';
// import { Clothe4 } from '../components/Clothe4';
// import { Clothe5 } from '../components/Clothe5';
// import { Clothe6 } from '../components/Clothe6';
import { Earings1 } from '@/components/Earings/Earings1'
// import { Earings2 } from '../components/Earings2';
// import { Necklace2 } from '../components/Necklace2';
import { Necklace1 } from '@/components/Necklace/Necklace1'
import { Glass1 } from '@/components/Glass/Glass1'
// import { Glass2 } from '../components/Glass2';
// import { Teeth1 } from '../components/Teeth1';
// import { Tongue1 } from '../components/Tongue1';

type ComponentProps = {
  shadows?: boolean
  onLoaded?: () => void
}

type ComponentMap = {
  [key: string]: (props: ComponentProps) => JSX.Element
}

const handleOnLoaded = () => {
  console.log('Model loaded')
  window.status = 'ready'
}

const renderComponent = (componentName: string, props: ComponentProps) => {
  const Components: ComponentMap = {
    /* @ts-ignore */
    Head1: (props) => <Head1 {...props} />,
    // Head2: (props) => <Head2 {...props} />,
    // Head3: (props) => <Head3 {...props} />,
    // Head4: (props) => <Head4 {...props} />,
    // Head5: (props) => <Head5 {...props} />,
    // Head6: (props) => <Head6 {...props} />,
    // Head7: (props) => <Head7 {...props} />,
    // Head8: (props) => <Head8 {...props} />,
    // Head9: (props) => <Head9 {...props} />,
    // Head10: (props) => <Head10 {...props} />,
    // Head11: (props) => <Head11 {...props} />,
    // Head12: (props) => <Head12 {...props} />,
    // Neck1: (props) => <Neck1 {...props} />,
    /* @ts-ignore */
    Eye1: (props) => <Eye1 {...props} />,
    // Noose1: (props) => <Noose1 {...props} />,
    // Ear1: (props) => <Ear1 {...props} />,
    // Clothe1: (props) => <Clothe1 {...props} />,
    // Clothe2: (props) => <Clothe2 {...props} />,
    // Clothe3: (props) => <Clothe3 {...props} />,
    // Clothe4: (props) => <Clothe4 {...props} />,
    // Clothe5: (props) => <Clothe5 {...props} />,
    // Clothe6: (props) => <Clothe6 {...props} />,
    /* @ts-ignore */
    Earings1: (props) => <Earings1 {...props} />,
    // Earings2: (props) => <Earings2 {...props} />,
    /* @ts-ignore */
    Ear1: (props) => <Ear1 {...props} />,
    /* @ts-ignore */
    Noose1: (props) => <Noose1 {...props} />,
    /* @ts-ignore */
    Necklace1: (props) => <Necklace1 {...props} />,
    // Necklace2: (props) => <Necklace2 {...props} />,
    /* @ts-ignore */
    Glass1: (props) => <Glass1 {...props} />
    // Glass2: (props) => <Glass2 {...props} />,
    // Tongue1: (props) => <Tongue1 {...props} />,
    // Teeth1: (props) => <Teeth1 {...props} />,
    // // Add more components as needed
  }

  const Component = Components[componentName]
  return Component ? <Component {...props} /> : null
}

export default function ViewerPage() {
  const router = useRouter()
  const { HEAD, NECK, NOOSE, EAR, EYE, NECKLACE, HAIR, GLASS, CLOTHE, TEETH, TONGUE } = router.query

  if (!HEAD || !NECK || !NOOSE || !EAR || !EYE || !NECKLACE || !HAIR || !GLASS || !CLOTHE || !TEETH || !TONGUE) {
    return (
      <>
        <p>Oops! It seems that some essential components are missing from the URL. Please provide the following components:</p>
        <ul>
          {!HEAD && <li>Head</li>}
          {!NECK && <li>Neck</li>}
          {!NOOSE && <li>Noose</li>}
          {!EAR && <li>Ear</li>}
          {!NOOSE && <li>Noose</li>}
          {!EYE && <li>Eye</li>}
          {!NECKLACE && <li>Necklace</li>}
          {!HAIR && <li>Hair</li>}
          {!GLASS && <li>Glass</li>}
          {!CLOTHE && <li>Clothe</li>}
          {!TEETH && <li>Teeth</li>}
          {!TONGUE && <li>Tongue</li>}
        </ul>
      </>
    )
  }

  const componentProps: ComponentProps = {
    shadows: true,
    onLoaded: handleOnLoaded
  }

  return (
    <Canvas gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }} camera={{ fov: 50 }} shadows>
      <Suspense fallback={null}>
        {/*// @ts-ignore*/}
        <Stage contactShadow={true} shadows adjustCamera={1.1} intensity={0.6} environment="sunset" preset="portrait">
          {renderComponent(HEAD as string, componentProps)}
          {renderComponent(NECK as string, componentProps)}
          {renderComponent(NOOSE as string, componentProps)}
          {renderComponent(EYE as string, componentProps)}
          {renderComponent(EAR as string, componentProps)}
          {renderComponent(NECKLACE as string, componentProps)}
          {renderComponent(TEETH as string, componentProps)}
          {renderComponent(TONGUE as string, componentProps)}
          {renderComponent(CLOTHE as string, componentProps)}
          {renderComponent(HAIR as string, componentProps)}
          {renderComponent(GLASS as string, componentProps)}
        </Stage>
      </Suspense>
    </Canvas>
  )
}
