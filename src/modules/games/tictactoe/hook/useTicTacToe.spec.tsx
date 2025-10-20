import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTicTacToe } from './useTicTacToe'
import { useGameStore } from '../store/gameStore'

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

describe('useTicTacToe Hook', () => {
  beforeEach(() => {
    // Limpa o store antes de cada teste
    useGameStore.getState().resetGame()
    vi.clearAllMocks()
  })

  describe('Estado inicial', () => {
    it('deve retornar o estado inicial correto', () => {
      const { result } = renderHook(() => useTicTacToe())

      expect(result.current.board).toEqual(Array(9).fill('normal'))
      expect(result.current.currentPlayer).toBe('x')
      expect(result.current.gameState).toBe('playing')
      expect(result.current.winner).toBeNull()
      expect(result.current.winningLine).toBeNull()
      expect(result.current.isGameOver).toBe(false)
      expect(result.current.isDraw).toBe(false)
      expect(result.current.hasWinner).toBe(false)
    })

    it('deve incluir as posições dos blocos 3D', () => {
      const { result } = renderHook(() => useTicTacToe())

      expect(result.current.blocksPositions).toHaveLength(9)
      expect(result.current.blocksPositions[0]).toEqual({
        position: [-5.5, 5, -5.5],
        color: '#f9f',
      })
    })
  })

  describe('Estados derivados', () => {
    it('deve calcular isGameOver corretamente quando há vitória', () => {
      const { result } = renderHook(() => useTicTacToe())

      act(() => {
        // Simular vitória do X
        result.current.handleBlockClick(0) // X
        result.current.handleBlockClick(3) // O
        result.current.handleBlockClick(1) // X
        result.current.handleBlockClick(4) // O
        result.current.handleBlockClick(2) // X - vitória
      })

      expect(result.current.isGameOver).toBe(true)
      expect(result.current.hasWinner).toBe(true)
      expect(result.current.isDraw).toBe(false)
    })

    it('deve calcular isGameOver corretamente quando há empate', () => {
      const { result } = renderHook(() => useTicTacToe())

      act(() => {
        // Simular empate: X O X | O X O | O X X
        result.current.handleBlockClick(4) // X centro
        result.current.handleBlockClick(0) // O
        result.current.handleBlockClick(8) // X
        result.current.handleBlockClick(2) // O
        result.current.handleBlockClick(6) // X
        result.current.handleBlockClick(7) // O
        result.current.handleBlockClick(1) // X
        result.current.handleBlockClick(5) // O
        result.current.handleBlockClick(3) // X - empate
      })

      expect(result.current.isGameOver).toBe(true)
      expect(result.current.hasWinner).toBe(false)
      expect(result.current.isDraw).toBe(true)
    })
  })

  describe('Ações do jogo', () => {
    it('deve permitir fazer jogadas', () => {
      const { result } = renderHook(() => useTicTacToe())

      act(() => {
        result.current.handleBlockClick(0)
      })

      expect(result.current.board[0]).toBe('x')
      expect(result.current.currentPlayer).toBe('o')
    })

    it('deve permitir resetar o jogo', () => {
      const { result } = renderHook(() => useTicTacToe())

      act(() => {
        result.current.handleBlockClick(0)
        result.current.handleBlockClick(1)
      })

      expect(result.current.board[0]).toBe('x')
      expect(result.current.board[1]).toBe('o')

      act(() => {
        result.current.resetGame()
      })

      expect(result.current.board).toEqual(Array(9).fill('normal'))
      expect(result.current.currentPlayer).toBe('x')
      expect(result.current.gameState).toBe('playing')
    })
  })
})
