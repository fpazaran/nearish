import React from 'react'
import Background from '../components/Background'

function Loading() {
  return (
    <Background>
      <div className="text-2xl text-[var(--darker_pink)] font-medium">
        Loading...
      </div>
    </Background>
  )
}

export default Loading