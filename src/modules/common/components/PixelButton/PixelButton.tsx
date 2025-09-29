import React from 'react'

type PixelButtonProps = {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export const PixelButton: React.FC<PixelButtonProps> = ({
  onClick,
  children,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2
        bg-indigo-600 hover:bg-indigo-700
        text-white font-pixelated
        border-2 border-b-4 border-r-4 border-indigo-900
        active:border-b-2 active:border-r-2 active:translate-y-1 active:translate-x-1
        transition-all duration-100
        shadow-md
        ${className}
      `}
      style={{
        imageRendering: 'pixelated',
        fontFamily: '"Press Start 2P", cursive, monospace',
        fontSize: '0.8rem',
        letterSpacing: '0.05em',
      }}
    >
      {children}
    </button>
  )
}
