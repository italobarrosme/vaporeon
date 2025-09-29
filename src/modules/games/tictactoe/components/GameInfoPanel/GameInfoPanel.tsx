import { memo } from 'react'
import { useTicTacToeStore } from '@/stores/ticTacToeStore'
import { GAME_INFO_PANEL_TEXTS } from './constants'
import { GAME_STATE } from '../../constants/game'

type GameInfoPanelProps = {
  onRestartRound: () => void
  onResetPlayers: () => void
  players: { x: string; o: string }
}

const GameInfoPanelComponent = ({
  onRestartRound,
  onResetPlayers,
  players,
}: GameInfoPanelProps) => {
  const gameState = useTicTacToeStore((state) => state.gameState)
  const currentPlayer = useTicTacToeStore((state) => state.currentPlayer)
  const winner = useTicTacToeStore((state) => state.winner)
  const isDraw = gameState === GAME_STATE.DRAW

  const renderActionButtons = () => {
    if (gameState === GAME_STATE.WON || isDraw) {
      return (
        <>
          <button
            onClick={onRestartRound}
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
      <div>{renderActionButtons()}</div>
    </div>
  )
}

export const GameInfoPanel = memo(GameInfoPanelComponent)
