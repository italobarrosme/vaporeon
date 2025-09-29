import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface PlayerState {
  players: {
    player1: string
    player2: string
  }
  setPlayer: (player: 'player1' | 'player2', name: string) => void
  reset: () => void
}

// 1. Estado inicial centralizado
const initialPlayers: PlayerState['players'] = {
  player1: '',
  player2: '',
}

// 2. Usando StateCreator para tipar a criação do store
const playerStoreCreator = (set: any): PlayerState => ({
  players: initialPlayers,
  setPlayer: (player: any, name: any) =>
    set((state: PlayerState) => ({
      players: { ...state.players, [player]: name.trim() },
    })),
  reset: () => set(() => ({ players: initialPlayers })),
})

export const usePlayerStore = create<PlayerState>()(
  persist(playerStoreCreator, {
    name: 'player-storage',
    storage: createJSONStorage(() => localStorage),
  })
)
