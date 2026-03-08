import React from 'react'
import Background from '../../components/Background'
import PageNavBar from '../../components/PageNavBar'

function CreateVisitPage() {
  return (
    <Background>
      <PageNavBar />
      <div className="text-2xl font-medium text-[var(--darker_pink)]">
        Create Visit
      </div>
    </Background>
  )
}

export default CreateVisitPage
