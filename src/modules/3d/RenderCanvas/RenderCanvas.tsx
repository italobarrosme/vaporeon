'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
// import { EffectOutline } from '../animations/components'
// import * as THREE from 'three'
// import { CameraLogger } from '../utils/CameraLogger'

type RenderCanvasProps = {
  children: React.ReactNode
}

export const RenderCanvas = ({ children }: RenderCanvasProps) => {
  const initialPosition: [number, number, number] = [-12.52, 28.37, 21.75]
  const initialLookAt: [number, number, number] = [-0.015, -0.023, 0.056]
  const positionLight: [number, number, number] = [-5, 9, 10]
  return (
    <Canvas
      shadows
      className="w-screen h-screen"
      dpr={[1, 1.5]} // Reduzir DPR para economizar memória
      gl={{ antialias: true }}
      camera={{
        position: initialPosition,
        fov: 70,
        near: 1,
        far: 80,
      }}
    >
      <color attach="background" args={['#5f27cd']} />
      <mesh position={positionLight}>
        <pointLight
          position={positionLight}
          intensity={1000}
          castShadow
          color="#F5F7FA"
          shadow-mapSize={[2048, 2048]}
        />
      </mesh>
      {/* <EffectOutline
        initialPosition={initialPosition}
        disablePointerAnimation={false}
        currentBasePosition={new THREE.Vector3(...initialPosition)}
        persistedLookAt={new THREE.Vector3(...initialLookAt)}
      >
        {children}
      </EffectOutline> */}
      {children}
      <OrbitControls
        position0={initialPosition}
        target0={initialLookAt}
        enableDamping={false}
        dampingFactor={0.05}
        // enableZoom={false}
        // enableRotate={false}
        // enablePan={false}
      />
      {/* <CameraLogger /> */}
    </Canvas>
  )
}
