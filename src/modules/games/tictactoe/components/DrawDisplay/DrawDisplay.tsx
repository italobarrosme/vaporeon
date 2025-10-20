'use client'

type DrawDisplayProps = {
  resetGame: () => void
}

export const DrawDisplay = ({ resetGame }: DrawDisplayProps) => {
  return (
    <div className="bg-gray-400 border-4 border-gray-500 rounded-lg p-6 shadow-xl animate-pulse">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🤝 EMPATE! 🤝</h2>
        <div className="bg-gray-300 rounded-lg p-4 border-2 border-gray-600">
          <p className="text-2xl font-extrabold text-gray-800">
            Ninguém venceu desta vez!
          </p>
          <p className="text-lg font-semibold text-gray-700 mt-1">
            Que tal uma revanche?
          </p>
        </div>
        <div className="mt-4 text-gray-800">
          <span className="text-4xl">🎯</span>
          <span className="mx-2 text-lg font-medium">Boa partida!</span>
          <span className="text-4xl">🎯</span>
        </div>
        <button
          onClick={resetGame}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Jogar Novamente
        </button>
      </div>
    </div>
  )
}
