'use client'

import { GAME_INFO_PANEL_TEXTS } from './constants'
import { GAME_STATE } from '../../constants/game'
import { useTicTacToe } from '../../hook'
import { usePlayerStore } from '../../store'
import { redirect } from 'next/navigation'

export const GameInfoPanel = () => {
  const { gameState, currentPlayer, winner, isDraw, resetGame } = useTicTacToe()
  const { players, resetPlayers } = usePlayerStore()

  const onRestGame = () => {
    // TODO: IMPLEMENTAR RESTART ROUND
    resetGame()
  }

  const onResetPlayers = () => {
    // TODO: IMPLEMENTAR RESET PLAYERS
    resetPlayers()
    resetGame()
    redirect('/')
  }

  return (
    <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg text-gray-800 z-10">
      <h2 className="text-xl font-bold mb-2">{GAME_INFO_PANEL_TEXTS.title}</h2>
      <div className="text-lg">
        {gameState === GAME_STATE.PLAYING && (
          <p>{`${GAME_INFO_PANEL_TEXTS.turn} ${players[currentPlayer]}`}</p>
        )}
        {gameState === GAME_STATE.WON && winner && (
          <p>{`${players[winner]} ${GAME_INFO_PANEL_TEXTS.winner}`}</p>
        )}
        {isDraw && <p>{GAME_INFO_PANEL_TEXTS.draw}</p>}
      </div>
      <div>{GameInfoPanelController({ onRestGame, onResetPlayers })}</div>
    </div>
  )
}

type GameInfoPanelControllerProps = {
  onRestGame: () => void
  onResetPlayers: () => void
}

const GameInfoPanelController = ({
  onRestGame,
  onResetPlayers,
}: GameInfoPanelControllerProps) => {
  const { gameState, isDraw } = useTicTacToe()

  if (gameState === GAME_STATE.WON || isDraw) {
    return (
      <>
        <button
          onClick={onRestGame}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {GAME_INFO_PANEL_TEXTS.restartRound}
        </button>
        <button
          onClick={onResetPlayers}
          className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          {GAME_INFO_PANEL_TEXTS.restartPlayers}
        </button>
      </>
    )
  }

  return (
    <button
      onClick={onResetPlayers}
      className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
    >
      {GAME_INFO_PANEL_TEXTS.restartPlayers}
    </button>
  )
}
