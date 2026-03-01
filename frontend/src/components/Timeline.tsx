import React from 'react'
import { Visit } from '../api/backend/visits'

interface TimelineProps {
  visit: Visit | null
}

function Timeline({ visit }: TimelineProps) {
  if (!visit) return null;

  return (
    <div className="flex flex-row items-center justify-center w-full h-2 bg-[var(--darker_pink)] rounded-2xl ">
      
    </div>
  )
}

export default Timeline