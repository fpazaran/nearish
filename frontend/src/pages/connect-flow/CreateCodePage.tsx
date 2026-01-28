import Background from '../../components/Background'
import { useState, useEffect } from 'react'
import { createCode } from '../../api/backend/auth'
import SquareRounded from '../../components/SquareRounded'
import RoundedShadowBox from '../../components/containers/RoundedShadowBox'
import { FiCopy } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'
import BackButtonRect from '../../components/buttons/BackButtonRect'
import { useUser } from '../../contexts/UserContext'
import { getMe } from '../../api/backend/auth'
import AlertModal from '../../modals/AlertModal'


function CreateCodePage() {
  const user = useUser()
  const [copied, setCopied] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    const handleCreateCode = async () => {
      const code = await createCode();
      console.log(code)
      user.setInviteCode(code)
    }
    handleCreateCode()
  }, [])
  
  const handleCopyCode = () => {
    if (user.inviteCode) {
      navigator.clipboard.writeText(user.inviteCode.code.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
    }
  }

  const handleSharedCode = async () => { 
    const me = await getMe()
    // if user does not have a partner yet, notify user
    if (me.couple && !me.couple.partner) {
      setAlertMessage("Your partner has not joined yet. Please wait for them to join.")
      setAlertOpen(true)
    }
    user.setMe(me)
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
              Here is  your invite code:
            </div>
            <div className="w-full h-24 flex flex-row items-center justify-center tracking-[0.3em] text-6xl font-medium text-[var(--lightest_pink)] text-center bg-[var(--darker_pink)] rounded-2xl px-4 py-2 leading-none">
              <span className="-mr-[0.3em]">{user.inviteCode ? user.inviteCode.code : '...'}</span>
            </div>
            <div className="w-full h-12 flex flex-row items-center justify-center text-lg font-medium text-[var(--medium_pink)] text-center">
              Share this with your partner for them to join your shared space.
            </div>
            <div className="w-full h-12 flex flex-row items-center justify-center bg-[var(--bg_pink)] text-[var(--darker_pink)] font-bold text-lg 
                            px-6 py-2 rounded-2xl justify-center items-center cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity gap-2 select-none"
                            onClick={handleCopyCode}>
              <FiCopy className="w-6 h-6 font-bold" />
              {copied ? 'Copied!' : 'Copy Code'}
            </div>
          </RoundedShadowBox>
          <div className="w-full h-12 flex flex-row items-center justify-center bg-[var(--darker_pink)] text-[var(--lightest_pink)] font-medium text-lg 
                          px-6 py-2 rounded-2xl justify-center items-center cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity shadow-xl select-none"
                          onClick={handleSharedCode}>
            I've Shared My Code
          </div>
        </div>
      </div>
      
      <AlertModal 
        message={alertMessage}
        onClose={() => setAlertOpen(false)}
        isOpen={alertOpen}
      />
    </Background>
  )
}

export default CreateCodePage