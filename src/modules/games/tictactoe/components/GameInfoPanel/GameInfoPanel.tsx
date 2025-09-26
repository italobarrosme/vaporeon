import { useState } from 'react'
import { useTicTacToe } from '@/modules/games/tictactoe/hook/useTicTacToe'

type GameInfoPanelProps = {
  gameState: ReturnType<typeof useTicTacToe>['gameState']
  currentPlayer: ReturnType<typeof useTicTacToe>['currentPlayer']
  winner: ReturnType<typeof useTicTacToe>['winner']
  isDraw: ReturnType<typeof useTicTacToe>['isDraw']
  resetGame: ReturnType<typeof useTicTacToe>['resetGame']
  setPlayers: (players: { x: string; o: string }) => void
  players: { x: string; o: string }
}

export const GameInfoPanel = ({
  gameState,
  currentPlayer,
  winner,
  isDraw,
  resetGame,
  setPlayers,
  players,
}: GameInfoPanelProps) => {
  const [gameStarted, setGameStarted] = useState(false)
  const [player1, setPlayer1] = useState('')
  const [player2, setPlayer2] = useState('')

  const handleStartGame = () => {
    if (player1 && player2) {
      setPlayers({ x: player1, o: player2 })
      setGameStarted(true)
    }
  }

  const handleReset = () => {
    resetGame()
    setGameStarted(false)
    setPlayer1('')
    setPlayer2('')
  }

  if (!gameStarted) {
    return (
      <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg text-gray-800 z-10">
        <h2 className="text-xl font-bold mb-2">Jogo da Velha</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nome do Jogador 1 (X)"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Nome do Jogador 2 (O)"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleStartGame}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Iniciar Jogo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg text-gray-800 z-10">
      <h2 className="text-xl font-bold mb-2">Jogo da Velha</h2>
      <div className="text-lg">
        {gameState === 'playing' && (
          <p>
            Vez de:{' '}
            {players[currentPlayer.toLowerCase() as keyof typeof players]}
          </p>
        )}
        {gameState === 'won' && winner && (
          <p>{players[winner.toLowerCase() as keyof typeof players]} venceu!</p>
        )}
        {isDraw && <p>O jogo empatou!</p>}
      </div>
      {(gameState === 'won' || isDraw) && (
        <button
          onClick={handleReset}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reiniciar Jogo
        </button>
      )}
    </div>
  )
}
