'use client'

import { GAME_INFO_PANEL_TEXTS } from './constants'
import { GAME_STATE } from '../../constants/game'
import { usePlayerStore } from '../../store'
import { redirect } from 'next/navigation'

// Componente para exibir o status do jogo
type GameStatusProps = {
  gameState: 'playing' | 'won' | 'draw'
  currentPlayer: 'x' | 'o'
  winner: 'x' | 'o' | null
  isDraw: boolean
}

const GameStatus = ({ gameState, currentPlayer, winner }: GameStatusProps) => {
  const { players } = usePlayerStore()

  return (
    <>
      <h2 className="text-xl font-bold mb-2">{GAME_INFO_PANEL_TEXTS.title}</h2>
      <div className="text-lg">
        {gameState === GAME_STATE.PLAYING && (
          <p>{`${GAME_INFO_PANEL_TEXTS.turn} ${players[currentPlayer]}`}</p>
        )}
        {gameState === GAME_STATE.WON && winner && (
          <p>{`${players[winner]} ${GAME_INFO_PANEL_TEXTS.winner}`}</p>
        )}
        {gameState === GAME_STATE.DRAW && <p>{GAME_INFO_PANEL_TEXTS.draw}</p>}
      </div>
    </>
  )
}

// Componente para os controles do jogo
type GameControlsProps = {
  gameState: 'playing' | 'won' | 'draw'
  isDraw: boolean
  resetGame: () => void
}

const GameControls = ({ gameState, isDraw, resetGame }: GameControlsProps) => {
  const { resetPlayers } = usePlayerStore()

  const onResetPlayers = () => {
    resetPlayers()
    resetGame()
    redirect('/')
  }

  if (gameState === GAME_STATE.WON || isDraw) {
    return (
      <>
        <button
          onClick={resetGame}
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

// Componente principal do painel de informações
type GameInfoPanelProps = {
  gameState: 'playing' | 'won' | 'draw'
  currentPlayer: 'x' | 'o'
  winner: 'x' | 'o' | null
  isDraw: boolean
  resetGame: () => void
}

export const GameInfoPanel = (props: GameInfoPanelProps) => {
  return (
    <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg text-gray-800 z-10">
      <GameStatus
        gameState={props.gameState}
        currentPlayer={props.currentPlayer}
        winner={props.winner}
        isDraw={props.isDraw}
      />
      <GameControls
        gameState={props.gameState}
        isDraw={props.isDraw}
        resetGame={props.resetGame}
      />
    </div>
  )
}
