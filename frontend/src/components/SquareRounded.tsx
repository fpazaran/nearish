import React, { ReactNode } from 'react'

function RectangleRounded({ children }: { children?: React.ReactNode}) {
  return (
    <div className="rounded-2xl bg-[var(--bg_pink)] min-w-12 min-h-12 w-12 h-12 flex items-center justify-center">
      {children}
    </div>
  )
}

export default RectangleRounded