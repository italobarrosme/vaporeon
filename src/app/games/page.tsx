'use client'
import dynamic from 'next/dynamic'
import { useTicTacToe } from '@/modules/games/tictactoe/hook/useTicTacToe'
import { GameInfoPanel } from '@/modules/games/tictactoe/components/GameInfoPanel'

const Scene = dynamic(() => import('@/modules/3d/Scene'), {
  ssr: false,
})

const RenderCanvas = dynamic(() => import('@/modules/3d/RenderCanvas'), {
  ssr: false,
})

export default function Game() {
  const {
    gameState,
    currentPlayer,
    winner,
    isDraw,
    resetGame,
    handleBlockClick,
    board,
    blocksPositions,
    players,
    setPlayers,
  } = useTicTacToe()

  return (
    <div className="relative w-screen h-screen">
      <GameInfoPanel
        gameState={gameState}
        currentPlayer={currentPlayer}
        winner={winner}
        isDraw={isDraw}
        resetGame={resetGame}
        players={players}
        setPlayers={setPlayers}
      />
      <RenderCanvas>
        <Scene
          handleBlockClick={handleBlockClick}
          board={board}
          blocksPositions={blocksPositions}
        />
      </RenderCanvas>
    </div>
  )
}
