import Background from '../../components/Background'
import { useState, useEffect } from 'react'
import { createCode } from '../../api/backend/auth'
import SquareRounded from '../../components/SquareRounded'
import RoundedShadowBox from '../../components/containers/RoundedShadowBox'
import { FiCopy } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import BackButtonRect from '../../components/buttons/BackButtonRect'


function CreateCodePage() {
  const [code, setCode] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleCreateCode = async () => {
      setCode(await createCode())
    }
    handleCreateCode()
  }, [])
  
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
              Here is  your invite code:
            </div>
            <div className="w-full h-24 flex flex-row items-center justify-center tracking-[0.3em] text-6xl font-medium text-[var(--lightest_pink)] text-center bg-[var(--darker_pink)] rounded-2xl px-4 py-2 leading-none">
              <span className="-mr-[0.3em]">{code ? code : '123456'}</span>
            </div>
            <div className="w-full h-12 flex flex-row items-center justify-center text-lg font-medium text-[var(--medium_pink)] text-center">
              Share this with your partner for them to join your shared space.
            </div>
            <div className="w-full h-12 flex flex-row items-center justify-center bg-[var(--bg_pink)] text-[var(--darker_pink)] font-bold text-lg 
                            px-6 py-2 rounded-2xl justify-center items-center cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity gap-2 select-none">
              <FiCopy className="w-6 h-6 font-bold" />
              Copy Code
            </div>
          </RoundedShadowBox>
          <div className="w-full h-12 flex flex-row items-center justify-center bg-[var(--darker_pink)] text-[var(--lightest_pink)] font-medium text-lg 
                          px-6 py-2 rounded-2xl justify-center items-center cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity shadow-xl select-none">
            I've Shared My Code
          </div>
        </div>
      </div>
    </Background>
  )
}

export default CreateCodePage