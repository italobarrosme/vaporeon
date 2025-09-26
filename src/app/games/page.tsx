'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useTicTacToe } from '@/modules/games/tictactoe/hook/useTicTacToe'
import { GameInfoPanel } from '@/modules/games/tictactoe/components/GameInfoPanel'
import { StartScreen } from '@/modules/games/tictactoe/components/StartScreen'

const Scene = dynamic(() => import('@/modules/3d/Scene'), {
  ssr: false,
})

const RenderCanvas = dynamic(() => import('@/modules/3d/RenderCanvas'), {
  ssr: false,
})

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false)
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

  const handleStartGame = (newPlayers: { p1: string; p2: string }) => {
    setPlayers({ x: newPlayers.p1, o: newPlayers.p2 })
    setGameStarted(true)
  }

  const restartRound = () => {
    resetGame()
  }

  const resetPlayers = () => {
    resetGame()
    setGameStarted(false)
  }

  if (!gameStarted) {
    return <StartScreen onStart={handleStartGame} />
  }

  return (
    <div className="relative w-screen h-screen">
      <GameInfoPanel
        gameState={gameState}
        currentPlayer={currentPlayer}
        winner={winner}
        isDraw={isDraw}
        onRestartRound={restartRound}
        onResetPlayers={resetPlayers}
        players={players}
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
