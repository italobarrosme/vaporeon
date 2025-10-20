import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

type PlayerState = {
  players: {
    x: string
    o: string
  }
  setPlayer: (player: 'x' | 'o', name: string) => void
  resetPlayers: () => void
}

// 1. Estado inicial centralizado
const initialPlayers: PlayerState['players'] = {
  x: '',
  o: '',
}

// 2. Usando StateCreator para tipar a criação do store
const playerStoreCreator = (set: any): PlayerState => ({
  players: initialPlayers,
  setPlayer: (player: any, name: any) =>
    set((state: PlayerState) => ({
      players: { ...state.players, [player]: name.trim() },
    })),
  resetPlayers: () => set(() => ({ players: initialPlayers })),
})

// 3. Criando o store no localStorage
export const usePlayerStore = create<PlayerState>()(
  persist(playerStoreCreator, {
    name: 'player-storage',
    storage: createJSONStorage(() => localStorage),
  })
)
