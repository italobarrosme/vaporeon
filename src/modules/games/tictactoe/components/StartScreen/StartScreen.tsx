import { useState } from 'react'

type Props = {
  onStart: (players: { p1: string; p2: string }) => void
}

export default function StartScreen({ onStart }: Props) {
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')

  const handleStart = () => {
    if (!player1.trim() || !player2.trim()) return
    onStart({ p1: player1, p2: player2 })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a003d] text-white font-['Press_Start_2P']">
      <div className="text-center space-y-6">
        <h1 className="text-3xl text-yellow-400 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          INÍCIO DO JOGO
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="JOGADOR 1"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="w-64 p-3 bg-[#1a006d] border-4 border-yellow-500 text-white text-sm tracking-wider focus:outline-none"
          />
          <input
            type="text"
            placeholder="JOGADOR 2"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="w-64 p-3 bg-[#1a006d] border-4 border-yellow-500 text-white text-sm tracking-wider focus:outline-none"
          />
        </div>

        <button
          onClick={handleStart}
          disabled={!player1.trim() || !player2.trim()}
          className="w-64 py-3 bg-red-600 border-4 border-yellow-500 text-yellow-200 text-sm tracking-wider hover:bg-red-700 transition disabled:opacity-50"
        >
          INICIAR JOGO
        </button>
      </div>
    </div>
  )
}
