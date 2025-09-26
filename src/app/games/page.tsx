'use client'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/modules/3d/Scene'), {
  ssr: false,
})

const RenderCanvas = dynamic(() => import('@/modules/3d/RenderCanvas'), {
  ssr: false,
})

export default function Game() {
  return (
    <RenderCanvas>
      <Scene />
    </RenderCanvas>
  )
}
