import { forwardRef } from 'react'
import { FiCalendar } from 'react-icons/fi'

interface CustomDateInputProps {
  value?: string
  onClick?: () => void
  placeholder?: string
}

const CustomDateInput = forwardRef<HTMLButtonElement, CustomDateInputProps>(
  ({ value, onClick, placeholder = 'mm/dd/yy' }, ref) => {
    const displayValue = value && value.trim() !== '' ? value : placeholder
    const isPlaceholder = !value || value.trim() === ''
    
    return (
      <button
        type="button"
        className="flex items-center justify-between w-44 rounded-xl px-4 py-3 bg-[var(--dark-medium-pink)] 
          outline-none text-md font-bold text-[var(--darker_pink)] cursor-pointer gap-2"
        onClick={onClick}
        ref={ref}
      >
        <span className={`flex-1 text-left ${isPlaceholder ? 'opacity-60' : ''}`}>
          {displayValue}
        </span>
        <FiCalendar className="w-5 h-5 flex-shrink-0" />
      </button>
    )
  }
)

export default CustomDateInput
