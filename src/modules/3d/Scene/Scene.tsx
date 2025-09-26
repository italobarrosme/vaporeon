'use client'

import { Physics } from '@react-three/rapier'
import { createRef, Fragment, useRef } from 'react'

import { RapierDebug } from '../utils/RapierDebug'
import { Block } from '@/modules/games/tictactoe/3d/Block'
import { Mesh } from 'three'
import { Floor } from '../pieces/Floor'
import { useTicTacToe } from '@/modules/games/tictactoe/hook/useTicTacToe'
// import { useRainObjects } from '../animations/hooks/useRainObjects'

// import { objectsDataMock } from '@/modules/games/mockItems'

// 3x3 tic toc toe

export const Scene = () => {
  const { blocksPositions, board, handleBlockClick } = useTicTacToe()

  const floorRef = useRef<Mesh>(null)
  const blocksRefs = useRef<Array<React.RefObject<Mesh | null>>>(
    // Inicializar array de refs
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
