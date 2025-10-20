import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DrawDisplay } from './DrawDisplay'
import '@testing-library/jest-dom'

describe('DrawDisplay Component', () => {
  const mockResetGame = vi.fn()

  const defaultProps = {
    resetGame: mockResetGame,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Renderização', () => {
    it('deve renderizar o componente corretamente', () => {
      render(<DrawDisplay {...defaultProps} />)

      expect(screen.getByText('🤝 EMPATE! 🤝')).toBeInTheDocument()
      expect(screen.getByText('Ninguém venceu desta vez!')).toBeInTheDocument()
      expect(screen.getByText('Que tal uma revanche?')).toBeInTheDocument()
      expect(screen.getByText('Boa partida!')).toBeInTheDocument()
      expect(screen.getByText('Jogar Novamente')).toBeInTheDocument()
    })

    it('deve exibir todos os textos de empate', () => {
      render(<DrawDisplay {...defaultProps} />)

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        '🤝 EMPATE! 🤝'
      )
      expect(screen.getByText('Ninguém venceu desta vez!')).toBeInTheDocument()
      expect(screen.getByText('Que tal uma revanche?')).toBeInTheDocument()
    })
  })

  describe('Estilos', () => {
    it('deve ter as classes CSS corretas para o tema cinza', () => {
      const { container } = render(<DrawDisplay {...defaultProps} />)

      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv).toHaveClass('bg-gray-400')
      expect(mainDiv).toHaveClass('border-4')
      expect(mainDiv).toHaveClass('border-gray-500')
      expect(mainDiv).toHaveClass('rounded-lg')
      expect(mainDiv).toHaveClass('animate-pulse')
    })

    it('deve ter animação de pulse', () => {
      const { container } = render(<DrawDisplay {...defaultProps} />)

      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv).toHaveClass('animate-pulse')
    })

    it('deve ter estilo de centralização', () => {
      render(<DrawDisplay {...defaultProps} />)

      const centerDiv = screen
        .getByText('🤝 EMPATE! 🤝')
        .closest('.text-center')
      expect(centerDiv).toBeInTheDocument()
    })
  })

  describe('Interações', () => {
    it('deve chamar resetGame quando o botão for clicado', () => {
      render(<DrawDisplay {...defaultProps} />)

      const resetButton = screen.getByText('Jogar Novamente')
      fireEvent.click(resetButton)

      expect(mockResetGame).toHaveBeenCalledTimes(1)
    })

    it('deve ter o botão de reset acessível', () => {
      render(<DrawDisplay {...defaultProps} />)

      const resetButton = screen.getByRole('button', {
        name: 'Jogar Novamente',
      })
      expect(resetButton).toBeInTheDocument()
      expect(resetButton).toBeEnabled()
    })

    it('deve permitir múltiplos cliques no botão', () => {
      render(<DrawDisplay {...defaultProps} />)

      const resetButton = screen.getByText('Jogar Novamente')

      fireEvent.click(resetButton)
      fireEvent.click(resetButton)
      fireEvent.click(resetButton)

      expect(mockResetGame).toHaveBeenCalledTimes(3)
    })
  })

  describe('Acessibilidade', () => {
    it('deve ter estrutura semântica adequada', () => {
      render(<DrawDisplay {...defaultProps} />)

      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('🤝 EMPATE! 🤝')

      const button = screen.getByRole('button')
      expect(button).toHaveTextContent('Jogar Novamente')
    })

    it('deve ser navegável por teclado', () => {
      render(<DrawDisplay {...defaultProps} />)

      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('deve ter texto alternativo adequado', () => {
      render(<DrawDisplay {...defaultProps} />)

      // Verifica se os textos são descritivos
      expect(screen.getByText('Ninguém venceu desta vez!')).toBeInTheDocument()
      expect(screen.getByText('Que tal uma revanche?')).toBeInTheDocument()
    })
  })

  describe('Elementos visuais', () => {
    it('deve exibir emojis de handshake', () => {
      render(<DrawDisplay {...defaultProps} />)

      const title = screen.getByText('🤝 EMPATE! 🤝')
      expect(title).toBeInTheDocument()
    })

    it('deve exibir emojis de alvo', () => {
      render(<DrawDisplay {...defaultProps} />)

      const targetEmojis = screen.getAllByText('🎯')
      expect(targetEmojis).toHaveLength(2)
    })

    it('deve ter layout centralizado', () => {
      render(<DrawDisplay {...defaultProps} />)

      const centerContainer = screen
        .getByText('🤝 EMPATE! 🤝')
        .closest('.text-center')
      expect(centerContainer).toBeInTheDocument()
    })
  })

  describe('Responsividade', () => {
    it('deve ter classes responsivas adequadas', () => {
      const { container } = render(<DrawDisplay {...defaultProps} />)

      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv).toHaveClass('p-6')
      expect(mainDiv).toHaveClass('shadow-xl')
    })

    it('deve ter espaçamento adequado entre elementos', () => {
      render(<DrawDisplay {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('mt-4')
    })
  })

  describe('Estados do botão', () => {
    it('deve ter estilos de hover no botão', () => {
      render(<DrawDisplay {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('hover:bg-blue-600')
    })

    it('deve ter cores corretas no botão', () => {
      render(<DrawDisplay {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-blue-500')
      expect(button).toHaveClass('text-white')
    })

    it('deve ter bordas arredondadas no botão', () => {
      render(<DrawDisplay {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('rounded')
    })
  })

  describe('Integração', () => {
    it('deve funcionar com diferentes funções de callback', () => {
      const customCallback = vi.fn()
      const props = {
        resetGame: customCallback,
      }

      render(<DrawDisplay {...props} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(customCallback).toHaveBeenCalledTimes(1)
    })

    it('deve manter funcionalidade mesmo com callback undefined', () => {
      const props = {
        resetGame: undefined as any,
      }

      // Não deve quebrar mesmo com callback inválido
      expect(() => {
        render(<DrawDisplay {...props} />)
      }).not.toThrow()
    })
  })
})
