'use client'

import dynamic from 'next/dynamic'
import { GameInfoPanel } from '@/modules/games/tictactoe/components/GameInfoPanel'

const Scene = dynamic(() => import('@/modules/3d/Scene'), {
  ssr: false,
})

const RenderCanvas = dynamic(() => import('@/modules/3d/RenderCanvas'), {
  ssr: false,
})

export default function Game() {
  return (
    <div className="relative w-screen h-screen">
      <GameInfoPanel />
      <RenderCanvas>
        <Scene />
      </RenderCanvas>
    </div>
  )
}
