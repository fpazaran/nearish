import React, { useState } from 'react'
import RoundedShadowBox from '../../components/containers/RoundedShadowBox'
import Background from '../../components/Background'
import Loading from '../Loading'
import { useUser } from '../../contexts/UserContext';
import { USER_NAME_MAX_LENGTH } from '../../api/constants/User';

function EnterNamePage() {
  const user = useUser();
  const [name, setName] = useState('');
  if (user.loading) {
    return <Loading />
  }

  const handleContinue = () => {
    if (name.length > 0) {
      const onSaveFailed = () => {
        alert('Failed to save name. Please try again.');
      }
      user.updateName(name, onSaveFailed);
    } else {
      alert('Please enter your name.');
    }
  }

  return (
    <Background>
      <div className="flex flex-row w-full h-full justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-medium text-[var(--darker_pink)] mb-6">
            nearish
          </div>
          <RoundedShadowBox>
            <div className="flex flex-col items-start justify-start w-full gap-5">
            <div className="flex flex-col items-start justify-start w-full gap-1">
              <div className="text-3xl font-bold text-[var(--darker_pink)] text-left">
                What is your name?
              </div>
              <div className="text-xl font-bold text-[var(--medium_pink)] text-left">
                This is how your partner will see you.
              </div>
            </div>
            <input
              type="text"
              className="w-full rounded-xl px-4 py-3 bg-[var(--dark-medium-pink)] focus:ring-3 focus:ring-[var(--darker_pink)] transition-all duration-400
              outline-none transition-shadow text-xl font-bold text-[var(--darker_pink)]
              min-h-12"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              maxLength={USER_NAME_MAX_LENGTH}
            />
            <button className="w-full rounded-xl py-3 px-2 bg-[var(--darker_pink)] text-[var(--lightest_pink)] text-2xl 
                              font-medium text-center flex items-center justify-center transition-opacity duration-100 
                              hover:opacity-80 active:opacity-20 active:[transition-duration:300ms]"
                              onClick={handleContinue}>
              Continue →
            </button>
            </div>
          </RoundedShadowBox>
        </div>
      </div>
    </Background>
  )
}

export default EnterNamePage