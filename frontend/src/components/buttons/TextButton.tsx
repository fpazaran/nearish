import React from 'react'

type TextButtonProps = {
  text: string
  onClick: () => void
  className?: string
}

function TextButton({ text, onClick, className }: TextButtonProps) {
  return (
    <button className={`transition-opacity duration-300 ease-in-out active:opacity-20 ${className}`} onClick={onClick}>
      <div className="text-2xl font-medium text-[var(--darker_pink)]">{text}</div>
    </button>
  )
}

export default TextButton
