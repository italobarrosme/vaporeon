import { cn } from '@/utils'
import { ReactNode } from 'react'

type PixelButtonProps = {
  onClick: () => void
  children: ReactNode
  className?: string
}

export const PixelButton = ({
  onClick,
  children,
  className,
}: PixelButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-pixelated border-2 border-b-4 border-r-4 border-indigo-900 active:border-b-2 active:border-r-2 active:translate-y-1 active:translate-x-1 transition-all duration-100 shadow-md',
        className
      )}
    >
      {children}
    </button>
  )
}
