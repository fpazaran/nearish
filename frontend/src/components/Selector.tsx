import React, { useState } from 'react'

interface SelectorOption<T extends string> {
  label: string;
  value: T;
}

interface SelectorProps<T extends string> {
  options: SelectorOption<T>[];
  defaultValue?: T;
  onChange: (value: T) => void;
  className?: string;
  textStyle?: string;
}

function Selector<T extends string>({ options, defaultValue, onChange, className, textStyle }: SelectorProps<T>) {
  const [selected, setSelected] = useState<T>(defaultValue ?? options[0].value)

  const handleSelect = (value: T) => {
    setSelected(value)
    onChange(value)
  }

  return (
    <div className={`flex flex-row bg-[var(--darker_pink)] rounded-full p-1.5 gap-1 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSelect(option.value)}
          className={`px-5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer select-none
            ${selected === option.value
              ? 'bg-[var(--lightest_pink)] text-[var(--darker_pink)] '
              : 'bg-transparent text-white hover:text-white/80'
            } ${textStyle}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default Selector
