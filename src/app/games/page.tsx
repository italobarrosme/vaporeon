'use client'

import dynamic from 'next/dynamic'
import { GameInfoPanel } from '@/modules/games/tictactoe/components/GameInfoPanel'
import { useTicTacToe } from '@/modules/games/tictactoe/hook'

const Scene = dynamic(() => import('@/modules/3d/Scene'), {
  ssr: false,
})

const RenderCanvas = dynamic(() => import('@/modules/3d/RenderCanvas'), {
  ssr: false,
})

export default function Game() {
  const game = useTicTacToe()

  return (
    <div className="relative w-screen h-screen">
      <GameInfoPanel
        gameState={game.gameState}
        currentPlayer={game.currentPlayer}
        winner={game.winner}
        isDraw={game.isDraw}
        resetGame={game.resetGame}
      />
      <RenderCanvas>
        <Scene {...game} />
      </RenderCanvas>
    </div>
  )
}
