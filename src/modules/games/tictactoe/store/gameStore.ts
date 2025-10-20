import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type Player = 'x' | 'o'
type CellState = 'normal' | Player
type GameStatus = 'playing' | 'won' | 'draw'

type GameState = {
  board: Array<CellState>
  currentPlayer: Player
  gameState: GameStatus
  winner: Player | null
  winningLine: number[] | null
}

type GameActions = {
  handleBlockClick: (index: number) => void
  resetGame: () => void
}

const initialState: GameState = {
  board: Array(9).fill('normal'),
  currentPlayer: 'x',
  gameState: 'playing',
  winner: null,
  winningLine: null,
}

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const checkWinner = (
  newBoard: Array<CellState>
): { winner: Player | null; winningLine: number[] | null } => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination
    if (
      newBoard[a] !== 'normal' &&
      newBoard[a] === newBoard[b] &&
      newBoard[a] === newBoard[c]
    ) {
      return { winner: newBoard[a] as Player, winningLine: combination }
    }
  }
  return { winner: null, winningLine: null }
}

const checkDraw = (newBoard: Array<CellState>): boolean => {
  // Primeiro verifica se há um vencedor - se houver, não é empate
  const { winner } = checkWinner(newBoard)
  if (winner) {
    return false
  }

  // Só é empate se todas as posições estão preenchidas E não há vencedor
  return newBoard.every((cell) => cell !== 'normal')
}

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      handleBlockClick: (index: number) => {
        const { gameState, board, currentPlayer } = get()
        if (gameState !== 'playing' || board[index] !== 'normal') {
          return
        }

        const newBoard = [...board]
        newBoard[index] = currentPlayer

        const { winner, winningLine } = checkWinner(newBoard)

        if (winner) {
          set({ board: newBoard, gameState: 'won', winner, winningLine })
          return
        }

        if (checkDraw(newBoard)) {
          set({
            board: newBoard,
            gameState: 'draw',
            winner: null,
            winningLine: null,
          })
          return
        }

        set({
          board: newBoard,
          currentPlayer: currentPlayer === 'x' ? 'o' : 'x',
        })
      },
      resetGame: () => {
        set(initialState)
      },
    }),
    {
      name: 'ticTacToeGameState',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
