import React from 'react'

interface BackgroundProps {
  children: React.ReactNode;
}

function Background({ children }: BackgroundProps) {
  return (
    <div className="flex flex-col w-screen h-screen bg-[var(--bg_pink)] justify-center items-center">
      {children}
    </div>
  )
}

export default Background