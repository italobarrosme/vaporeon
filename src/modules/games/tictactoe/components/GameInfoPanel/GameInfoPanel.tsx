'use client'

import { useEffect, useState } from 'react'
import { GAME_INFO_PANEL_TEXTS } from './constants'
import { GAME_STATE } from '../../constants/game'
import { usePlayerStore } from '../../store'
import { redirect } from 'next/navigation'
import { useTicTacToe } from '../../hook'

// Tipagem D.R.Y: Os tipos são derivados diretamente do hook.
type GameState = ReturnType<typeof useTicTacToe>
type GameInfoPanelProps = Pick<
  GameState,
  'gameState' | 'currentPlayer' | 'winner' | 'isDraw' | 'resetGame'
>

export const GameInfoPanel = ({
  gameState,
  currentPlayer,
  winner,
  isDraw,
  resetGame,
}: GameInfoPanelProps) => {
  const { players, resetPlayers } = usePlayerStore()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Ação para reiniciar apenas a rodada
  const onResetGame = () => {
    resetGame()
  }

  // Ação para reiniciar o jogo e os jogadores
  const onResetPlayers = () => {
    resetPlayers()
    resetGame()
    redirect('/')
  }

  return (
    <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg text-gray-800 z-10">
      <h2 className="text-xl font-bold mb-2">{GAME_INFO_PANEL_TEXTS.title}</h2>
      <div className="text-lg">
        {isClient && gameState === GAME_STATE.PLAYING && (
          <p>{`${GAME_INFO_PANEL_TEXTS.turn} ${players[currentPlayer]}`}</p>
        )}
        {isClient && gameState === GAME_STATE.WON && winner && (
          <p>{`${players[winner]} ${GAME_INFO_PANEL_TEXTS.winner}`}</p>
        )}
        {isDraw && <p>{GAME_INFO_PANEL_TEXTS.draw}</p>}
      </div>

      <div className="mt-4">
        {gameState === GAME_STATE.WON || isDraw ? (
          <>
            <button
              onClick={onResetGame}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {GAME_INFO_PANEL_TEXTS.restartRound}
            </button>
            <button
              onClick={onResetPlayers}
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              {GAME_INFO_PANEL_TEXTS.restartPlayers}
            </button>
          </>
        ) : (
          <button
            onClick={onResetPlayers}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {GAME_INFO_PANEL_TEXTS.restartPlayers}
          </button>
        )}
      </div>
    </div>
  )
}
