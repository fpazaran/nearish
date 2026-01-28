import React from 'react'

interface RedRoundedRectProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

function RedRoundedRect({ children, onClick }: RedRoundedRectProps) {
  return (
    <div className="w-full h-12 flex flex-row items-center justify-center bg-[var(--darker_pink)] text-[var(--lightest_pink)] font-medium text-lg 
                          px-6 py-2 rounded-2xl justify-center items-center cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity shadow-xl select-none"
                          onClick={onClick}>
      {children}
    </div>
  )
}

export default RedRoundedRect