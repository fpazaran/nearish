import React from 'react'
import SquareRounded from '../SquareRounded'

interface RoundedIconRectangleProps {
  icon: React.ReactNode
  text: string
  description: string
  onClick: () => void
}

function RoundedIconRectangleButton({ icon, text, description, onClick }: RoundedIconRectangleProps) {
  return (
    <div className="flex flex-row items-center justify-start gap-4 bg-[var(--lightest_pink)] min-w-112 rounded-2xl py-6 pl-6 
    shadow-lg/5 hover:shadow-lg/10 active:opacity-70 transition-all duration-100 select-none" onClick={onClick}>
      <SquareRounded className="rounded-3xl w-15 h-15 bg-[var(--dark-dark-pink)]">
        {icon}
      </SquareRounded>
      <div className="flex flex-col items-center justify-center text-left items-start">
        <div className="text-2xl font-medium text-[var(--darker_pink)]">
          {text}
        </div>
        <div className="text-md font-medium text-[var(--medium_pink)]">
          {description}
        </div>
      </div>
    </div>
  )
}

export default RoundedIconRectangleButton