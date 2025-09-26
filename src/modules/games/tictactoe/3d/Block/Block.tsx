import { RigidBody, RigidBodyProps } from '@react-three/rapier'
import { forwardRef, useState } from 'react'
import { Mesh } from 'three'
import { X } from '../X/X'

type BlockProps = {
  size: [number, number, number]
  color: string
  position: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
  rigidBody?: boolean
  rigidBodyOptions?: RigidBodyProps
  blockType?: 'normal' | 'x' | 'O'
  onClick?: () => void
}

const rotationTypeBlock = {
  normal: [0, 0, 0],
  x: [Math.PI / 2, 0, 0],
  O: [Math.PI / 2, 0, 0],
} as const

export const Block = forwardRef<Mesh, BlockProps>(
  (
    {
      size = [5, 1, 5],
      color,
      position,
      rotation,
      scale,
      rigidBody = true,
      rigidBodyOptions,
      blockType = 'normal',
      onClick,
    },
    ref
  ) => {
    const [hovered, setHover] = useState(false)

    const handlePointerEnter = () => {
      setHover(true)
      document.body.style.cursor = 'pointer'
    }
    const handlePointerLeave = () => {
      setHover(false)
      document.body.style.cursor = 'default'
    }

    const switchPosition = (): [number, number, number] => {
      switch (blockType) {
        case 'normal':
          return position
        case 'x':
          return [position[0], position[1] - 1, position[2]]
        case 'O':
          return [position[0], position[1] - 1, position[2]]
      }
    }

    if (rigidBody) {
      return (
        <RigidBody
          position={switchPosition()}
          scale={scale}
          {...rigidBodyOptions}
        >
          <mesh
            castShadow
            receiveShadow
            ref={ref}
            rotation={rotationTypeBlock[blockType] as [number, number, number]}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onClick={onClick}
          >
            {blockType === 'normal' && <boxGeometry args={size} />}
            {blockType === 'x' && <X args={[4.5, 0.5, 0.5]} color={color} />}
            {blockType === 'O' && (
              <>
                <torusGeometry args={[1.5, 0.5, 16, 32]} />
                <meshPhysicalMaterial color={color} />
              </>
            )}
            <meshPhysicalMaterial color={color} />
          </mesh>
        </RigidBody>
      )
    }

    return (
      <mesh
        position={hovered ? [position[0], position[1], position[2]] : position}
        rotation={rotation}
        scale={scale}
        castShadow
        receiveShadow
        ref={ref}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onClick={onClick}
      >
        <boxGeometry args={size} />
        <meshPhysicalMaterial color={color} />
      </mesh>
    )
  }
)

Block.displayName = 'Block'
