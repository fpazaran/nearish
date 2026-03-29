import React from 'react'
import { Visit } from '../../api/backend/visits'
import { formatDateRange } from '../../utils/visits'

interface VisitCardProps {
  visit: Visit;
  onClick?: () => void;
}

function VisitCard({ visit, onClick }: VisitCardProps) {

  const getStatus = () => {
    const now = new Date()
    const end = new Date(visit.end + 'T00:00:00')
    return end < now ? 'Complete' : 'Planned'
  }

  const status = getStatus()

  return (
    <div
      className="flex flex-col bg-[var(--lightest_pink)] rounded-2xl w-65 h-57 overflow-hidden
        transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-102
        active:scale-95 cursor-pointer select-none"
      onClick={onClick}
    >
      <div className="flex-[2] bg-[var(--darker_pink)] rounded-t-2xl" />

      <div className="flex-1 flex flex-col justify-center gap-1.5 px-4 py-3">
        <div className="text-md font-bold text-[var(--darker_pink)] leading-tight">
          {visit.description}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--darker_pink)]">
          <span className="opacity-70 text-sm">{formatDateRange(visit.start, visit.end)}</span>
          <span className="ml-auto bg-[var(--bg_pink)] text-[var(--darker_pink)] text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {status}
          </span>
        </div>
      </div>
    </div>
  )
}

export default VisitCard
