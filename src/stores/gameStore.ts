import { create } from 'zustand'

interface GameState {
  gameStarted: boolean
  startGame: () => void
  resetGame: () => void
}

export const useGameStore = create<GameState>()((set) => ({
  gameStarted: false,
  startGame: () => set({ gameStarted: true }),
  resetGame: () => set({ gameStarted: false }),
}))
