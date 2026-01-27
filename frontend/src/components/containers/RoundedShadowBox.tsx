import React from 'react'

interface RoundedShadowBoxProps {
  children?: React.ReactNode;
  className?: string;
}

function RoundedShadowBox({ children, className }: RoundedShadowBoxProps) {
  return (
    <div className={`rounded-4xl shadow-2xl p-8 bg-[var(--lightest_pink)] w-124 min-h-84 flex flex-col justify-center items-center ${className}`}>
      {children}
    </div>
  )
}

export default RoundedShadowBox