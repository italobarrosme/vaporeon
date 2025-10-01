import { useState, useCallback, useEffect } from 'react'

// Tipos não foram alterados
type Player = 'x' | 'o'
type CellState = 'normal' | Player
type GameStatus = 'playing' | 'won' | 'draw'

// Um tipo para o objeto de estado unificado
type GameState = {
  board: Array<CellState>
  currentPlayer: Player
  gameState: GameStatus
  winner: Player | null
  winningLine: number[] | null
}

const blocksPositions = [
  { position: [-5.5, 5, -5.5], color: '#f9f' },
  { position: [0.5, 5, -5.5], color: '#f1f' },
  { position: [6.5, 5, -5.5], color: '#f15' },
  { position: [-5.5, 5, 0.5], color: '#f21' },
  { position: [0.5, 5, 0.5], color: '#f9f9f9' },
  { position: [6.5, 5, 0.5], color: '#f99' },
  { position: [-5.5, 5, 6.5], color: '#f55' },
  { position: [0.5, 5, 6.5], color: '#ff3' },
  { position: [6.5, 5, 6.5], color: '#f25' },
] as const

const winningCombinations = [
  [0, 1, 2], // linha superior
  [3, 4, 5], // linha meio
  [6, 7, 8], // linha inferior
  [0, 3, 6], // coluna esquerda
  [1, 4, 7], // coluna meio
  [2, 5, 8], // coluna direita
  [0, 4, 8], // diagonal principal
  [2, 4, 6], // diagonal secundária
]

// Função que define o estado inicial, lendo do localStorage se possível
const getInitialState = (): GameState => {
  // Previne erro no lado do servidor (SSR)
  if (typeof window === 'undefined') {
    return {
      board: Array(9).fill('normal'),
      currentPlayer: 'x',
      gameState: 'playing',
      winner: null,
      winningLine: null,
    }
  }

  try {
    const savedState = localStorage.getItem('ticTacToeGameState')
    if (savedState) {
      return JSON.parse(savedState)
    }
  } catch (error) {
    console.error('Erro ao ler o estado do localStorage:', error)
  }

  // Retorna o estado padrão se não houver nada salvo
  return {
    board: Array(9).fill('normal'),
    currentPlayer: 'x',
    gameState: 'playing',
    winner: null,
    winningLine: null,
  }
}

export const useTicTacToe = () => {
  // 1. O estado agora é um objeto único, inicializado de forma preguiçosa
  const [state, setState] = useState<GameState>(getInitialState)

  // 2. Este useEffect salva o estado no localStorage sempre que ele muda
  useEffect(() => {
    localStorage.setItem('ticTacToeGameState', JSON.stringify(state))
  }, [state])

  // 3. A lógica interna foi refatorada para usar o objeto de estado único

  const checkWinner = useCallback(
    (newBoard: Array<CellState>): { winner: Player | null; winningLine: number[] | null } => {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination
        if (
          newBoard[a] !== 'normal' &&
          newBoard[a] === newBoard[b] &&
          newBoard[a] === newBoard[c]
        ) {
          return { winner: newBoard[a] as Player, winningLine: combination }
        }
      }
      return { winner: null, winningLine: null }
    },
    []
  )

  const checkDraw = useCallback((newBoard: Array<CellState>): boolean => {
    return newBoard.every((cell) => cell !== 'normal')
  }, [])

  const handleBlockClick = useCallback(
    (index: number) => {
      if (state.gameState !== 'playing' || state.board[index] !== 'normal') {
        return
      }

      const newBoard = [...state.board]
      newBoard[index] = state.currentPlayer

      const { winner, winningLine } = checkWinner(newBoard)

      if (winner) {
        setState((prevState) => ({
          ...prevState,
          board: newBoard,
          gameState: 'won',
          winner,
          winningLine,
        }))
        return
      }

      if (checkDraw(newBoard)) {
        setState((prevState) => ({ ...prevState, board: newBoard, gameState: 'draw' }))
        return
      }

      setState((prevState) => ({
        ...prevState,
        board: newBoard,
        currentPlayer: prevState.currentPlayer === 'x' ? 'o' : 'x',
      }))
    },
    [state, checkWinner, checkDraw]
  )

  const resetGame = useCallback(() => {
    // O reset agora apaga o estado salvo, criando um novo estado padrão
    setState({
      board: Array(9).fill('normal'),
      currentPlayer: 'x',
      gameState: 'playing',
      winner: null,
      winningLine: null,
    })
  }, [])

  // 4. O retorno do hook mantém a mesma "forma", então os componentes não quebram
  return {
    ...state,
    blocksPositions,
    handleBlockClick,
    resetGame,
    isGameOver: state.gameState !== 'playing',
    isDraw: state.gameState === 'draw',
    hasWinner: state.gameState === 'won',
  }
}