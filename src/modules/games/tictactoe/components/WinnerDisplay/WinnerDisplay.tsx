'use client'

type WinnerDisplayProps = {
  winner: {
    player: 'x' | 'o'
    name: string
  }
  resetGame: () => void
}

export const WinnerDisplay = ({ winner, resetGame }: WinnerDisplayProps) => {
  return (
    <div className="bg-yellow-400 border-4 border-yellow-500 rounded-lg p-6 shadow-xl animate-pulse">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-yellow-900 mb-2">
          🏆 VENCEDOR! 🏆
        </h2>
        <div className="bg-yellow-300 rounded-lg p-4 border-2 border-yellow-600">
          <p className="text-2xl font-extrabold text-yellow-800">
            {winner.name}
          </p>
          <p className="text-lg font-semibold text-yellow-700 mt-1">
            Marcação {winner.player.toUpperCase()}
          </p>
        </div>
        <div className="mt-4 text-yellow-800">
          <span className="text-4xl">🎉</span>
          <span className="mx-2 text-lg font-medium">Parabéns!</span>
          <span className="text-4xl">🎉</span>
        </div>
        <button
          onClick={resetGame}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reiniciar Jogo
        </button>
      </div>
    </div>
  )
}
