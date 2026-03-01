import React from 'react'
import Background from '../../components/Background'
import { useUser } from '../../contexts/UserContext'
import RoundedIconRectangleButton from '../../components/buttons/RoundedIconRectangleButton'
import { FaPlus } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

function CreateJoinPage() {
  const user = useUser()
  const navigate = useNavigate()
  return (
    <Background>
      <div className="absolute top-4 left-4 text-4xl font-medium text-[var(--darker_pink)]">
        nearish
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="text-4xl font-medium text-[var(--darker_pink)]">
            Hello {user.name}!
          </div>
          <div className="text-2xl font-medium text-[var(--medium_pink)]">
            How would you like to get started?
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <RoundedIconRectangleButton icon={<FaPlus className="text-3xl text-[var(--darker_pink)]" />} text="Create a new code." description="Invite your partner to join." onClick={() => { navigate('/create-code') }} />
          <RoundedIconRectangleButton icon={<FaLink className="text-3xl text-[var(--darker_pink)]" />} text="Join with a code." description="Join your partner's shared space." onClick={() => { navigate('/enter-code') }} />
        </div>
      </div>
    </Background>
  )
}

export default CreateJoinPage