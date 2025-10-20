import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useGameStore } from './gameStore'

// Mock do localStorage para os testes
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('GameStore', () => {
  beforeEach(() => {
    // Limpa o store antes de cada teste
    useGameStore.getState().resetGame()
    vi.clearAllMocks()
  })

  describe('Estado inicial', () => {
    it('deve ter o estado inicial correto', () => {
      const state = useGameStore.getState()

      expect(state.board).toEqual(Array(9).fill('normal'))
      expect(state.currentPlayer).toBe('x')
      expect(state.gameState).toBe('playing')
      expect(state.winner).toBeNull()
      expect(state.winningLine).toBeNull()
    })
  })

  describe('handleBlockClick', () => {
    it('deve fazer uma jogada válida', () => {
      const { handleBlockClick } = useGameStore.getState()

      handleBlockClick(0)

      const state = useGameStore.getState()
      expect(state.board[0]).toBe('x')
      expect(state.currentPlayer).toBe('o')
      expect(state.gameState).toBe('playing')
    })

    it('não deve permitir jogar na mesma posição duas vezes', () => {
      const { handleBlockClick } = useGameStore.getState()

      handleBlockClick(0)
      const boardAfterFirst = [...useGameStore.getState().board]

      handleBlockClick(0) // Tentar jogar na mesma posição

      const state = useGameStore.getState()
      expect(state.board).toEqual(boardAfterFirst)
      expect(state.currentPlayer).toBe('o') // Não deve mudar o jogador
    })

    it('deve alternar entre jogadores X e O', () => {
      const { handleBlockClick } = useGameStore.getState()

      expect(useGameStore.getState().currentPlayer).toBe('x')

      handleBlockClick(0)
      expect(useGameStore.getState().currentPlayer).toBe('o')

      handleBlockClick(1)
      expect(useGameStore.getState().currentPlayer).toBe('x')
    })
  })

  describe('Verificação de vitória', () => {
    it('deve detectar vitória na linha horizontal superior', () => {
      const { handleBlockClick } = useGameStore.getState()

      handleBlockClick(0) // X
      handleBlockClick(3) // O
      handleBlockClick(1) // X
      handleBlockClick(4) // O
      handleBlockClick(2) // X - vitória

      const state = useGameStore.getState()
      expect(state.gameState).toBe('won')
      expect(state.winner).toBe('x')
      expect(state.winningLine).toEqual([0, 1, 2])
    })

    it('deve detectar vitória do jogador O', () => {
      const { handleBlockClick } = useGameStore.getState()

      handleBlockClick(0) // X
      handleBlockClick(1) // O
      handleBlockClick(3) // X
      handleBlockClick(4) // O
      handleBlockClick(8) // X
      handleBlockClick(7) // O - vitória

      const state = useGameStore.getState()
      expect(state.gameState).toBe('won')
      expect(state.winner).toBe('o')
      expect(state.winningLine).toEqual([1, 4, 7])
    })
  })

  describe('Verificação de empate', () => {
    it('deve detectar empate quando todas as posições estão preenchidas sem vencedor', () => {
      const { handleBlockClick } = useGameStore.getState()

      // Sequência que resulta em empate: X O X | O X O | O X X
      handleBlockClick(4) // X centro
      handleBlockClick(0) // O
      handleBlockClick(8) // X
      handleBlockClick(2) // O
      handleBlockClick(6) // X
      handleBlockClick(7) // O
      handleBlockClick(1) // X
      handleBlockClick(5) // O
      handleBlockClick(3) // X - empate

      const state = useGameStore.getState()
      expect(state.gameState).toBe('draw')
      expect(state.winner).toBeNull()
      expect(state.winningLine).toBeNull()
      expect(state.board.every((cell) => cell !== 'normal')).toBe(true)
    })
  })

  describe('resetGame', () => {
    it('deve resetar o jogo para o estado inicial', () => {
      const { handleBlockClick, resetGame } = useGameStore.getState()

      // Fazer algumas jogadas
      handleBlockClick(0)
      handleBlockClick(1)
      handleBlockClick(2)

      // Resetar o jogo
      resetGame()

      const state = useGameStore.getState()
      expect(state.board).toEqual(Array(9).fill('normal'))
      expect(state.currentPlayer).toBe('x')
      expect(state.gameState).toBe('playing')
      expect(state.winner).toBeNull()
      expect(state.winningLine).toBeNull()
    })
  })
})
