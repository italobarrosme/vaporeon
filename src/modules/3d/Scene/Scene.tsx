import { Physics } from '@react-three/rapier'
import { createRef, Fragment, useRef } from 'react'

import { RapierDebug } from '../utils/RapierDebug'
import { Block } from '@/modules/games/tictactoe/3d/Block'
import { Mesh } from 'three'
import { Floor } from '../pieces/Floor'

// 1. Definir as props da cena com base no que é retornado pelo hook useTicTacToe
type SceneProps = {
  blocksPositions: readonly {
    position: readonly [number, number, number]
    color: string
  }[]
  board: Array<'normal' | 'x' | 'o'>
  handleBlockClick: (index: number) => void
}

export const Scene = ({
  board,
  blocksPositions,
  handleBlockClick,
}: SceneProps) => {
  const floorRef = useRef<Mesh>(null)
  const blocksRefs = useRef<Array<React.RefObject<Mesh | null>>>(
    Array.from({ length: blocksPositions.length }, () => createRef<Mesh>())
  )

  return (
    <Physics>
      <RapierDebug />
      {blocksPositions.map((block, index) => (
        <Fragment key={index}>
          <Block
            onClick={() => handleBlockClick(index)}
            key={index}
            ref={blocksRefs.current[index]}
            size={[5, 1, 5]}
            color={block.color}
            rigidBodyOptions={{ type: 'dynamic' }}
            position={block.position as [number, number, number]}
            blockType={board[index]}
          />
        </Fragment>
      ))}
      <Floor
        ref={floorRef}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[5, 1, 5]}
        rigidBodyOptions={{ type: 'fixed' }}
        color="#f9f9f9"
      />
    </Physics>
  )
}
