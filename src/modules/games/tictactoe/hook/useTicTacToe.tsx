import { useGameStore } from '../store/gameStore'

const blocksPositions = [
  { position: [-5.5, 5, -5.5], color: '#f9f' },
  { position: [0.5, 5, -5.5], color: '#f9f' },
  { position: [6.5, 5, -5.5], color: '#f9f' },
  { position: [-5.5, 5, 0.5], color: '#f9f' },
  { position: [0.5, 5, 0.5], color: '#f9f' },
  { position: [6.5, 5, 0.5], color: '#f9f' },
  { position: [-5.5, 5, 6.5], color: '#f9f' },
  { position: [0.5, 5, 6.5], color: '#f9f' },
  { position: [6.5, 5, 6.5], color: '#f9f' },
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
