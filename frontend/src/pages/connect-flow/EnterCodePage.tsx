import React, { useState, useRef, KeyboardEvent, ChangeEvent } from 'react'
import Background from '../../components/Background'
import RoundedShadowBox from '../../components/containers/RoundedShadowBox'
import BackButtonRect from '../../components/buttons/BackButtonRect'
import RedRoundedRect from '../../components/buttons/RedRoundedRect'
import { joinCouple } from '../../api/backend/auth'
import { useUser } from '../../contexts/UserContext'

function EnterCodePage() {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const user = useUser()

  const handleDigitChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) return
    
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return
    
    const newDigits = [...digits]
    newDigits[index] = value
    setDigits(newDigits)
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleConnect = async () => {
    const code = digits.join('')
    const couple = await joinCouple(code)
    user.setCouple(couple)
  }

  return (
    <Background>
      <div className="flex flex-row w-full h-full justify-center items-center">
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Header row with back button and nearish title */}
          <div className="w-full flex flex-row items-center justify-between">
            <BackButtonRect />
            <div className="text-4xl font-medium text-[var(--darker_pink)] flex-1 text-center">
              nearish
            </div>
            {/* Invisible spacer to balance the layout */}
            <div className="w-18"></div>
          </div>

          {/* Content box */}
          <RoundedShadowBox className="gap-4">
            <div className="w-full h-12 flex flex-row items-center justify-center text-3xl font-bold text-[var(--darker_pink)] text-center">
              Enter your invite code:
            </div>
            <div className="flex flex-row gap-3 justify-center items-center">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el: HTMLInputElement | null) => { inputRefs.current[index] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-16 h-16 rounded-2xl bg-[var(--bg_pink)] text-center text-3xl font-bold text-[var(--darker_pink)] focus:border-[var(--darker_pink)] focus:outline-none transition-colors"
                />
              ))}
            </div>
            <div className="w-full h-12 flex flex-row items-center justify-center text-lg font-medium text-[var(--medium_pink)] text-center">
              Once connected, you will both have access to shared trips, activities, and memories.
            </div>
            <RedRoundedRect onClick={handleConnect}>Connect</RedRoundedRect>
          </RoundedShadowBox>
        </div>
      </div>
    </Background>
  )
}

export default EnterCodePage