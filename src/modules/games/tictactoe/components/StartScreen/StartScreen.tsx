'use client'

import { useCallback, useEffect } from 'react'
import { usePlayerStore } from '@/stores/playerStore'
import { START_SCREEN_TEXTS } from './constants'
import { useGameStore } from '@/stores/gameStore'

export const StartScreen = () => {
  const { players, setPlayer, reset } = usePlayerStore()
  const startGame = useGameStore((state) => state.startGame)

  useEffect(() => {
    reset()
  }, [reset])

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!players.player1 || !players.player2) return
      startGame()
    },
    [players, startGame]
  )

  const handleChange = useCallback(
    (player: 'player1' | 'player2', value: string) => {
      setPlayer(player, value)
    },
    [setPlayer]
  )

  return (
    <div className="flex items-center justify-center min-h-screen bg-game-bg text-white font-press-start">
      <form onSubmit={handleSubmit} className="text-center space-y-6">
        <h1 className="text-3xl text-yellow-400 text-shadow-game">
          {START_SCREEN_TEXTS.title}
        </h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="player1" className="sr-only">
              {START_SCREEN_TEXTS.player1Placeholder}
            </label>
            <input
              id="player1"
              type="text"
              required
              placeholder={START_SCREEN_TEXTS.player1Placeholder}
              value={players.player1}
              onChange={(e) => handleChange('player1', e.target.value)}
              className="w-64 p-3 bg-game-input-bg border-4 border-yellow-500 text-white text-sm tracking-wider focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="player2" className="sr-only">
              {START_SCREEN_TEXTS.player2Placeholder}
            </label>
            <input
              id="player2"
              type="text"
              required
              placeholder={START_SCREEN_TEXTS.player2Placeholder}
              value={players.player2}
              onChange={(e) => handleChange('player2', e.target.value)}
              className="w-64 p-3 bg-game-input-bg border-4 border-yellow-500 text-white text-sm tracking-wider focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!players.player1 || !players.player2}
          className="w-64 py-3 bg-red-600 border-4 border-yellow-500 text-yellow-200 text-sm tracking-wider hover:bg-red-700 transition disabled:opacity-50"
        >
          {START_SCREEN_TEXTS.startButton}
        </button>
      </form>
    </div>
  )
}
