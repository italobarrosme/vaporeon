'use client'

import dynamic from 'next/dynamic'
import {
  GameInfoPanel,
  WinnerDisplay,
  DrawDisplay,
} from '@/modules/games/tictactoe/components'
import { useTicTacToe } from '@/modules/games/tictactoe/hook'
import { usePlayerStore } from '@/modules/games/tictactoe/store'

const Scene = dynamic(() => import('@/modules/3d/Scene'), {
  ssr: false,
})

const RenderCanvas = dynamic(() => import('@/modules/3d/RenderCanvas'), {
  ssr: false,
})

export default function Game() {
  const game = useTicTacToe()
  const { players } = usePlayerStore()

  const showDrawDisplay = game.isDraw || (game.isGameOver && !game.hasWinner)
  const showWinnerDisplay = game.hasWinner && game.winner

  return (
    <div className="relative w-screen h-screen">
      <GameInfoPanel
        gameState={game.gameState}
        currentPlayer={game.currentPlayer}
        winner={game.winner}
        isDraw={game.isDraw}
        resetGame={game.resetGame}
      />

      {/* Componente de exibição do vencedor */}
      {showWinnerDisplay && game.winner && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-20">
          <WinnerDisplay
            winner={{
              player: game.winner,
              name: players[game.winner],
            }}
            resetGame={game.resetGame}
          />
        </div>
      )}

      {/* Componente de exibição do empate */}
      {showDrawDisplay && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-20">
          <DrawDisplay resetGame={game.resetGame} />
        </div>
      )}

      <RenderCanvas>
        <Scene
          board={game.board}
          blocksPositions={game.blocksPositions}
          handleBlockClick={game.handleBlockClick}
        />
      </RenderCanvas>
    </div>
  )
}
