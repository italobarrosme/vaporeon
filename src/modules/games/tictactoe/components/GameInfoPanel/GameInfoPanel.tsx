import { useTicTacToe } from '@/modules/games/tictactoe/hook/useTicTacToe'

type GameInfoPanelProps = {
  gameState: ReturnType<typeof useTicTacToe>['gameState']
  currentPlayer: ReturnType<typeof useTicTacToe>['currentPlayer']
  winner: ReturnType<typeof useTicTacToe>['winner']
  isDraw: ReturnType<typeof useTicTacToe>['isDraw']
  onRestartRound: () => void
  onResetPlayers: () => void
  players: { x: string; o: string }
}

export const GameInfoPanel = ({
  gameState,
  currentPlayer,
  winner,
  isDraw,
  onRestartRound,
  onResetPlayers,
  players,
}: GameInfoPanelProps) => {
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
          onClick={onRestartRound}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reiniciar Rodada
        </button>
      )}
      <button
        onClick={onResetPlayers}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Reiniciar Jogadores
      </button>
    </div>
  )
}
