import { useTicTacToeStore } from '@/stores/ticTacToeStore'
import { GAME_STATE } from '../constants/game'

export const useTicTacToe = () => {
  const {
    board,
    currentPlayer,
    gameState,
    winner,
    winningLine,
    handleBlockClick,
    resetGame,
  } = useTicTacToeStore()

  return {
    // Estado do jogo
    board,
    currentPlayer,
    gameState,
    winner,
    winningLine,

    // Ações
    handleBlockClick,
    resetGame,

    // Utilitários
    isGameOver: gameState !== GAME_STATE.PLAYING,
    isDraw: gameState === GAME_STATE.DRAW,
    hasWinner: gameState === GAME_STATE.WON,
  }
}
