import { describe, it, expect, beforeEach, vi } from 'vitest'
import { usePlayerStore } from './playerStore'

// Mock do localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('PlayerStore', () => {
  beforeEach(() => {
    // Limpa o store antes de cada teste
    usePlayerStore.getState().resetPlayers()
    vi.clearAllMocks()
  })

  describe('Estado inicial', () => {
    it('deve ter o estado inicial correto', () => {
      const state = usePlayerStore.getState()

      expect(state.players.x).toBe('')
      expect(state.players.o).toBe('')
    })

    it('deve ter as funções necessárias', () => {
      const state = usePlayerStore.getState()

      expect(typeof state.setPlayer).toBe('function')
      expect(typeof state.resetPlayers).toBe('function')
    })
  })

  describe('setPlayer', () => {
    it('deve definir o nome do jogador X', () => {
      const { setPlayer } = usePlayerStore.getState()

      setPlayer('x', 'João')

      const state = usePlayerStore.getState()
      expect(state.players.x).toBe('João')
      expect(state.players.o).toBe('')
    })

    it('deve definir o nome do jogador O', () => {
      const { setPlayer } = usePlayerStore.getState()

      setPlayer('o', 'Maria')

      const state = usePlayerStore.getState()
      expect(state.players.x).toBe('')
      expect(state.players.o).toBe('Maria')
    })

    it('deve definir ambos os jogadores', () => {
      const { setPlayer } = usePlayerStore.getState()

      setPlayer('x', 'João')
      setPlayer('o', 'Maria')

      const state = usePlayerStore.getState()
      expect(state.players.x).toBe('João')
      expect(state.players.o).toBe('Maria')
    })

    it('deve sobrescrever o nome do jogador', () => {
      const { setPlayer } = usePlayerStore.getState()

      setPlayer('x', 'João')
      setPlayer('x', 'Pedro')

      const state = usePlayerStore.getState()
      expect(state.players.x).toBe('Pedro')
    })

    it('deve remover espaços em branco do nome', () => {
      const { setPlayer } = usePlayerStore.getState()

      setPlayer('x', '  João  ')
      setPlayer('o', '\tMaria\n')

      const state = usePlayerStore.getState()
      expect(state.players.x).toBe('João')
      expect(state.players.o).toBe('Maria')
    })
  })

  describe('resetPlayers', () => {
    it('deve resetar ambos os jogadores para string vazia', () => {
      const { setPlayer, resetPlayers } = usePlayerStore.getState()

      // Definir jogadores
      setPlayer('x', 'João')
      setPlayer('o', 'Maria')

      // Verificar se foram definidos
      expect(usePlayerStore.getState().players.x).toBe('João')
      expect(usePlayerStore.getState().players.o).toBe('Maria')

      // Resetar
      resetPlayers()

      // Verificar se foram resetados
      const state = usePlayerStore.getState()
      expect(state.players.x).toBe('')
      expect(state.players.o).toBe('')
    })
  })
})
