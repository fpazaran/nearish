import React from 'react'
import RoundedShadowBox from '../../components/containers/RoundedShadowBox'
import Background from '../../components/Background'
import Loading from '../Loading'
import { useUser } from '../../contexts/UserContext';

function EnterNamePage() {
  const user = useUser();
  if (user.loading) {
    return <Loading />
  }

  return (
    <Background>
      <div className="flex flex-row w-full h-full justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-medium text-[var(--darker_pink)] mb-6">
            nearish
          </div>
          <RoundedShadowBox>
            <div className="flex flex-row items-start justify-start">
              <div className="text-3xl font-bold text-[var(--darker_pink)]">
                What is your name?
              </div>
            </div>
          </RoundedShadowBox>
        </div>
      </div>
    </Background>
  )
}

export default EnterNamePage