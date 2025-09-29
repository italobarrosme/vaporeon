import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import Game from './page'
import { useGameStore } from '@/stores/gameStore'
import { usePlayerStore } from '@/stores/playerStore'
import { START_SCREEN_TEXTS } from '@/modules/games/tictactoe/components/StartScreen/constants'

// Mocks para os componentes filhos
vi.mock('@/modules/games/tictactoe/components/GameInfoPanel', () => ({
  GameInfoPanel: () => <div>Game Info Panel</div>,
}))

vi.mock('@/modules/3d/RenderCanvas', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

vi.mock('@/modules/3d/Scene', () => ({
  __esModule: true,
  default: () => <div>Scene</div>,
}))

// Estado inicial dos stores
const initialGameStoreState = useGameStore.getState()
const initialPlayerStoreState = usePlayerStore.getState()

describe('Game page', () => {
  beforeEach(() => {
    // Reseta os stores para o estado inicial antes de cada teste
    useGameStore.setState(initialGameStoreState)
    usePlayerStore.setState(initialPlayerStoreState)
  })

  it('should render the StartScreen initially', () => {
    render(<Game />)
    expect(
      screen.getByPlaceholderText(START_SCREEN_TEXTS.player1Placeholder)
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(START_SCREEN_TEXTS.player2Placeholder)
    ).toBeInTheDocument()
    expect(screen.getByText(START_SCREEN_TEXTS.startButton)).toBeInTheDocument()
  })

  it('should render the game view after starting the game', async () => {
    render(<Game />)

    // Simula o preenchimento dos nomes dos jogadores
    fireEvent.change(
      screen.getByPlaceholderText(START_SCREEN_TEXTS.player1Placeholder),
      {
        target: { value: 'Player 1' },
      }
    )
    fireEvent.change(
      screen.getByPlaceholderText(START_SCREEN_TEXTS.player2Placeholder),
      {
        target: { value: 'Player 2' },
      }
    )

    // Clica no botão para iniciar o jogo
    fireEvent.click(screen.getByText(START_SCREEN_TEXTS.startButton))

    // Aguarda a renderização da visão do jogo
    await waitFor(() => {
      expect(
        screen.queryByText(START_SCREEN_TEXTS.startButton)
      ).not.toBeInTheDocument()
    })

    // Verifica se a visão do jogo foi renderizada
    expect(screen.getByText('Game Info Panel')).toBeInTheDocument()
    expect(screen.getByText('Scene')).toBeInTheDocument()
  })
})
