import { RigidBody, RigidBodyProps } from '@react-three/rapier'
import { forwardRef } from 'react'
import { Mesh } from 'three'

type FloorProps = {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  rigidBodyOptions: RigidBodyProps
  color: string
}

export const Floor = forwardRef<Mesh, FloorProps>(
  ({ position, rotation, scale, rigidBodyOptions, color = '#f9f9f9' }, ref) => {
    return (
      <RigidBody
        type="fixed"
        position={position}
        rotation={rotation}
        scale={scale}
        {...rigidBodyOptions}
      >
        <mesh castShadow receiveShadow ref={ref}>
          <boxGeometry args={scale} />
          <meshPhysicalMaterial color={color} />
        </mesh>
      </RigidBody>
    )
  }
)

Floor.displayName = 'Floor'
