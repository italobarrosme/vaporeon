import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom' // Import jest-dom for toBeInTheDocument
import Game from './page'

// Mock child components
vi.mock('@/modules/games/tictactoe/components/StartScreen', () => ({
  StartScreen: ({
    onStart,
  }: {
    onStart: (players: { p1: string; p2: string }) => void
  }) => (
    <button onClick={() => onStart({ p1: 'Player 1', p2: 'Player 2' })}>
      Start Game
    </button>
  ),
}))

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

// Mock the hook
vi.mock('@/modules/games/tictactoe/hook/useTicTacToe', () => ({
  useTicTacToe: () => ({
    gameState: 'playing',
    currentPlayer: 'x',
    winner: null,
    isDraw: false,
    resetGame: vi.fn(),
    handleBlockClick: vi.fn(),
    board: Array(9).fill('normal'),
    blocksPositions: [],
    players: { x: 'Player 1', o: 'Player 2' },
    setPlayers: vi.fn(),
  }),
}))

describe('Game page', () => {
  it('should render the StartScreen initially', () => {
    render(<Game />)
    expect(screen.getByText('Start Game')).toBeInTheDocument()
  })

  it('should render the game view after starting the game', async () => {
    render(<Game />)

    // Start the game
    fireEvent.click(screen.getByText('Start Game'))

    // Check if the game view is rendered
    expect(await screen.findByText('Game Info Panel')).toBeInTheDocument()
    expect(await screen.findByText('Scene')).toBeInTheDocument()
  })
})
