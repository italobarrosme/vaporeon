'use client'

import dynamic from 'next/dynamic'
import { GameInfoPanel } from '@/modules/games/tictactoe/components/GameInfoPanel'
import { StartScreen } from '@/modules/games/tictactoe/components/StartScreen'
import { blocksPositions, useTicTacToeStore } from '@/stores/ticTacToeStore'
import { useTicTacToe } from '@/modules/games/tictactoe/hook/useTicTacToe'
import { useGameStore } from '@/stores/gameStore'
import { usePlayerStore } from '@/stores/playerStore'
import { PixelButton } from '@/modules/common/components/PixelButton'

const Scene = dynamic(() => import('@/modules/3d/Scene'), {
  ssr: false,
})

const RenderCanvas = dynamic(() => import('@/modules/3d/RenderCanvas'), {
  ssr: false,
})

export default function Game() {
  const { handleBlockClick, board } = useTicTacToe()
  const { gameStarted, resetGame: resetGameStore } = useGameStore()
  const resetTicTacToe = useTicTacToeStore((state) => state.resetGame)
  const { players } = usePlayerStore()

  const restartRound = () => {
    resetTicTacToe()
  }

  const resetPlayers = () => {
    resetTicTacToe()
    resetGameStore()
  }

  if (!gameStarted) {
    return <StartScreen />
  }

  // Função para resetar a posição da câmera
  const resetCameraPosition = () => {
    // Usando window.dispatchEvent para comunicar com o OrbitControls
    window.dispatchEvent(new CustomEvent('reset-camera-position'))
  }

  return (
    <div className="relative w-screen h-screen">
      <GameInfoPanel
        onRestartRound={restartRound}
        onResetPlayers={resetPlayers}
        players={{ x: players.player1, o: players.player2 }}
      />
      <div className="absolute bottom-4 right-4 z-10">
        <PixelButton onClick={resetCameraPosition}>Reset Câmera</PixelButton>
      </div>
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
