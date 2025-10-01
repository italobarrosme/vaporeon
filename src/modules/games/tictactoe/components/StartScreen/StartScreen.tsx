'use client'

// import { useEffect } from 'react'
import { usePlayerStore } from '@/modules/games/tictactoe/store/playerStore'
import { START_SCREEN_TEXTS } from './constants'
import { useTicTacToe } from '../../hook'
import { redirect } from 'next/navigation'

export const StartScreen = () => {
  const { players, setPlayer } = usePlayerStore()
  const { resetGame } = useTicTacToe()

  // useEffect(() => {
  //   resetPlayers()
  // }, [resetPlayers])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!players.x || !players.o) return
    resetGame()
    redirect('/games')
  }

  const handleChange = (player: 'x' | 'o', value: string) => {
    console.log('handleChange', player, value)
    setPlayer(player, value)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-game-bg text-white font-press-start">
      <form onSubmit={handleSubmit} className="text-center space-y-6">
        <h1 className="text-3xl text-yellow-400 text-shadow-game">
          {START_SCREEN_TEXTS.title}
        </h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="x" className="sr-only">
              {START_SCREEN_TEXTS.player1Placeholder}
            </label>
            <input
              id="x"
              type="text"
              required
              placeholder={START_SCREEN_TEXTS.player1Placeholder}
              defaultValue={players.x}
              onChange={(e) => handleChange('x', e.target.value)}
              className="w-64 p-3 bg-game-input-bg border-4 border-yellow-500 text-white text-sm tracking-wider focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="o" className="sr-only">
              {START_SCREEN_TEXTS.player2Placeholder}
            </label>
            <input
              id="o"
              type="text"
              required
              placeholder={START_SCREEN_TEXTS.player2Placeholder}
              defaultValue={players.o}
              onChange={(e) => handleChange('o', e.target.value)}
              className="w-64 p-3 bg-game-input-bg border-4 border-yellow-500 text-white text-sm tracking-wider focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!players.x || !players.o}
          className="w-64 py-3 bg-red-600 border-4 border-yellow-500 text-yellow-200 text-sm tracking-wider hover:bg-red-700 transition disabled:opacity-50"
        >
          {START_SCREEN_TEXTS.startButton}
        </button>
      </form>
    </div>
  )
}
