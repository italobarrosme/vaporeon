import { useGameStore } from '../store/gameStore'

const blocksPositions = [
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

export const useTicTacToe = () => {
  const state = useGameStore()

  return {
    ...state,
    blocksPositions,
    isGameOver: state.gameState !== 'playing',
    isDraw: state.gameState === 'draw',
    hasWinner: state.gameState === 'won',
  }
}
