import React from 'react'

interface RoundedShadowBoxProps {
  children: React.ReactNode;
}

function RoundedShadowBox({ children }: RoundedShadowBoxProps) {
  return (
    <div className="rounded-4xl shadow-2xl p-8 bg-[var(--lightest_pink)] min-w-124 min-h-84 flex flex-col justify-center items-center">
      {children}
    </div>
  )
}

export default RoundedShadowBox