import { useState, useCallback } from 'react'

type Player = 'x' | 'o'
type CellState = 'normal' | Player
type GameState = 'playing' | 'won' | 'draw'

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

// Combinações vencedoras (linhas, colunas, diagonais)
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

export const useTicTacToe = () => {
  const [board, setBoard] = useState<Array<CellState>>(Array(9).fill('normal'))
  const [currentPlayer, setCurrentPlayer] = useState<Player>('x')
  const [gameState, setGameState] = useState<GameState>('playing')
  const [winner, setWinner] = useState<Player | null>(null)
  const [winningLine, setWinningLine] = useState<number[] | null>(null)

  // Verifica se há vencedor
  const checkWinner = useCallback(
    (newBoard: Array<CellState>): Player | null => {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination
        if (
          newBoard[a] !== 'normal' &&
          newBoard[a] === newBoard[b] &&
          newBoard[a] === newBoard[c]
        ) {
          setWinningLine(combination)
          return newBoard[a] as Player
        }
      }
      return null
    },
    []
  )

  // Verifica se o tabuleiro está cheio (empate)
  const checkDraw = useCallback((newBoard: Array<CellState>): boolean => {
    return newBoard.every((cell) => cell !== 'normal')
  }, [])

  // Manipula o clique no bloco
  const handleBlockClick = useCallback(
    (index: number) => {
      // Não permite jogada se o jogo terminou ou célula já ocupada
      if (gameState !== 'playing' || board[index] !== 'normal') {
        return
      }

      const newBoard = [...board]
      newBoard[index] = currentPlayer

      // Verifica vencedor
      const gameWinner = checkWinner(newBoard)
      if (gameWinner) {
        setWinner(gameWinner)
        setGameState('won')
        setBoard(newBoard)
        return
      }

      // Verifica empate
      if (checkDraw(newBoard)) {
        setGameState('draw')
        setBoard(newBoard)
        return
      }

      // Continua o jogo - alterna jogador
      setBoard(newBoard)
      setCurrentPlayer(currentPlayer === 'x' ? 'o' : 'x')
    },
    [board, currentPlayer, gameState, checkWinner, checkDraw]
  )

  // Reinicia o jogo
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill('normal'))
    setCurrentPlayer('x')
    setGameState('playing')
    setWinner(null)
    setWinningLine(null)
  }, [])

  return {
    // Estado do jogo
    board,
    currentPlayer,
    gameState,
    winner,
    winningLine,
    blocksPositions,

    // Ações
    handleBlockClick,
    resetGame,

    // Utilitários
    isGameOver: gameState !== 'playing',
    isDraw: gameState === 'draw',
    hasWinner: gameState === 'won',
  }
}
