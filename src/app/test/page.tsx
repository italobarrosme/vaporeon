'use client'
import { StartScreen } from '@/modules/games/tictactoe/components/StartScreen'

export default function TestPage() {
  const handleStartGame = (players: { p1: string; p2: string }) => {
    console.log(players)
  }

  return <StartScreen onStart={handleStartGame} />
}
