import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { WinnerDisplay } from './WinnerDisplay'
import '@testing-library/jest-dom'

describe('WinnerDisplay Component', () => {
  const mockResetGame = vi.fn()

  const defaultProps = {
    winner: {
      player: 'x' as const,
      name: 'João',
    },
    resetGame: mockResetGame,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Renderização', () => {
    it('deve renderizar o componente corretamente', () => {
      render(<WinnerDisplay {...defaultProps} />)

      expect(screen.getByText('🏆 VENCEDOR! 🏆')).toBeInTheDocument()
      expect(screen.getByText('João')).toBeInTheDocument()
      expect(screen.getByText('Marcação X')).toBeInTheDocument()
      expect(screen.getByText('Parabéns!')).toBeInTheDocument()
      expect(screen.getByText('Reiniciar Jogo')).toBeInTheDocument()
    })

    it('deve exibir o nome do jogador vencedor', () => {
      const props = {
        ...defaultProps,
        winner: {
          player: 'o' as const,
          name: 'Maria',
        },
      }

      render(<WinnerDisplay {...props} />)

      expect(screen.getByText('Maria')).toBeInTheDocument()
      expect(screen.getByText('Marcação O')).toBeInTheDocument()
    })

    it('deve exibir a marcação correta para jogador X', () => {
      render(<WinnerDisplay {...defaultProps} />)

      expect(screen.getByText('Marcação X')).toBeInTheDocument()
    })

    it('deve exibir a marcação correta para jogador O', () => {
      const props = {
        ...defaultProps,
        winner: {
          player: 'o' as const,
          name: 'Maria',
        },
      }

      render(<WinnerDisplay {...props} />)

      expect(screen.getByText('Marcação O')).toBeInTheDocument()
    })
  })

  describe('Estilos', () => {
    it('deve ter as classes CSS corretas para o tema amarelo', () => {
      const { container } = render(<WinnerDisplay {...defaultProps} />)

      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv).toHaveClass('bg-yellow-400')
      expect(mainDiv).toHaveClass('border-4')
      expect(mainDiv).toHaveClass('border-yellow-500')
      expect(mainDiv).toHaveClass('rounded-lg')
      expect(mainDiv).toHaveClass('animate-pulse')
    })

    it('deve ter animação de pulse', () => {
      const { container } = render(<WinnerDisplay {...defaultProps} />)

      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv).toHaveClass('animate-pulse')
    })
  })

  describe('Interações', () => {
    it('deve chamar resetGame quando o botão for clicado', () => {
      render(<WinnerDisplay {...defaultProps} />)

      const resetButton = screen.getByText('Reiniciar Jogo')
      fireEvent.click(resetButton)

      expect(mockResetGame).toHaveBeenCalledTimes(1)
    })

    it('deve ter o botão de reset acessível', () => {
      render(<WinnerDisplay {...defaultProps} />)

      const resetButton = screen.getByRole('button', { name: 'Reiniciar Jogo' })
      expect(resetButton).toBeInTheDocument()
      expect(resetButton).toBeEnabled()
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter estrutura semântica adequada', () => {
      render(<WinnerDisplay {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('🏆 VENCEDOR! 🏆')

      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Reiniciar Jogo')
    })

    it('deve ser navegável por teclado', () => {
      render(<WinnerDisplay {...defaultProps} />)

      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })
  })

  describe('Casos extremos', () => {
    it('deve lidar com nomes longos', () => {
      const props = {
        ...defaultProps,
        winner: {
          player: 'x' as const,
          name: 'Nome Muito Longo Para Testar Quebra De Linha',
        },
      }

      render(<WinnerDisplay {...props} />)

      expect(
        screen.getByText('Nome Muito Longo Para Testar Quebra De Linha')
      ).toBeInTheDocument()
    })

    it('deve lidar com nomes vazios', () => {
      const props = {
        ...defaultProps,
        winner: {
          player: 'o' as const,
          name: '',
        },
      }

      render(<WinnerDisplay {...props} />)

      expect(screen.getByText('Marcação O')).toBeInTheDocument()
    })

    it('deve lidar com caracteres especiais no nome', () => {
      const props = {
        ...defaultProps,
        winner: {
          player: 'x' as const,
          name: 'José & María',
        },
      }

      render(<WinnerDisplay {...props} />)

      expect(screen.getByText('José & María')).toBeInTheDocument()
    })
  })

  describe('Emojis e elementos visuais', () => {
    it('deve exibir emojis de troféu', () => {
      render(<WinnerDisplay {...defaultProps} />)

      const title = screen.getByText('🏆 VENCEDOR! 🏆')
      expect(title).toBeInTheDocument()
    })

    it('deve exibir emojis de celebração', () => {
      render(<WinnerDisplay {...defaultProps} />)

      const celebrations = screen.getAllByText('🎉')
      expect(celebrations).toHaveLength(2)
      celebrations.forEach((celebration) => {
        expect(celebration).toBeInTheDocument()
      })
    })

    it('deve exibir texto de parabéns', () => {
      render(<WinnerDisplay {...defaultProps} />)

      expect(screen.getByText('Parabéns!')).toBeInTheDocument()
    })
  })
})
