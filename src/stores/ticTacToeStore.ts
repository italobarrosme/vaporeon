import { create } from 'zustand'
import { GAME_STATE } from '../modules/games/tictactoe/constants/game'

// Types
type Player = 'x' | 'o'
type CellState = 'normal' | Player
type GameState = (typeof GAME_STATE)[keyof typeof GAME_STATE]

// Constants
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
]

export const blocksPositions = [
  { position: [-5.5, 5, -5.5], color: '#f9f' },
  { position: [0.5, 5, -5.5], color: '#f1f' },
  { position: [6.5, 5, -5.5], color: '#f15' },
  { position: [-5.5, 5, 0.5], color: '#f21' },
  { position: [0.5, 5, 0.5], color: '#f9f9f9' },
  { position: [6.5, 5, 0.5], color: '#f99' },
  { position: [-5.5, 5, 6.5], color: '#f55' },
  { position: [0.5, 5, 6.5], color: '#ff3' },
  { position: [6.5, 5, 6.5], color: '#f25' },
] as const

// Store Interface
interface TicTacToeState {
  board: Array<CellState>
  currentPlayer: Player
  gameState: GameState
  winner: Player | null
  winningLine: number[] | null
  handleBlockClick: (index: number) => void
  resetGame: () => void
}

// Initial State
const initialState = {
  board: Array(9).fill('normal') as Array<CellState>,
  currentPlayer: 'x' as Player,
  gameState: GAME_STATE.PLAYING as GameState,
  winner: null as Player | null,
  winningLine: null as number[] | null,
}

export const useTicTacToeStore = create<TicTacToeState>()((set, get) => ({
  ...initialState,

  handleBlockClick: (index: number) => {
    const { gameState, board, currentPlayer } = get()

    if (gameState !== GAME_STATE.PLAYING || board[index] !== 'normal') {
      return
    }

    const newBoard = [...board]
    newBoard[index] = currentPlayer

    // Check for winner
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (
        newBoard[a] !== 'normal' &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        set({
          board: newBoard,
          gameState: GAME_STATE.WON,
          winner: newBoard[a] as Player,
          winningLine: combination,
        })
        return
      }
    }

    // Check for draw
    if (newBoard.every((cell) => cell !== 'normal')) {
      set({ board: newBoard, gameState: GAME_STATE.DRAW })
      return
    }

    // Continue playing
    set({
      board: newBoard,
      currentPlayer: currentPlayer === 'x' ? 'o' : 'x',
    })
  },

  resetGame: () => {
    set(initialState)
  },
}))
