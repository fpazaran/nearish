import React, { useEffect, useState } from 'react'
import Background from '../../components/Background'
import PageNavBar from '../../components/PageNavBar'
import { getVisits, Visit, VisitState } from '../../api/backend/visits'
import VisitCard from '../../components/visits/VisitCard';
import Selector from '../../components/Selector';
import { useNavigate } from 'react-router-dom';
import { useVisits } from '../../contexts/VisitsContext';

enum VisitFilter {
  ALL = 'all',
  PLANNED = VisitState.PLANNED,
  ACTIVE = VisitState.ACTIVE,
  COMPLETED = VisitState.COMPLETED,
}

function VisitsPage() {
  const { visits, setVisits } = useVisits()
  const [filter, setFilter] = useState<VisitFilter>(VisitFilter.ALL)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  const handleVisitClick = (visit: Visit) => {
    navigate(`/visits/${visit.id}`)
  }

  const handleAddVisit = () => {
    navigate('/visits/add')
  }

  useEffect(() => {
    const getVisitsData = async () => {
      try {
        const data = await getVisits();
        setVisits(data);
      } catch (error) {
        console.error("Error fetching visits:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (visits.length === 0) {
      getVisitsData();
    } else {
      setLoading(false);
    }
  }, [])

  const filteredVisits = visits.filter((visit) => {
    if (filter === VisitFilter.ALL) return true
    const now = new Date()
    const end = new Date(visit.end + 'T00:00:00')
    const start = new Date(visit.start + 'T00:00:00')
    if (filter === VisitFilter.ACTIVE) return start <= now && end >= now
    if (filter === VisitFilter.PLANNED) return start > now
    if (filter === VisitFilter.COMPLETED) return end < now
  })
  
  return (
    <Background>
      <PageNavBar />
      <div className="flex-1 flex flex-col mt-20 mb-10 w-fit mx-auto overflow-y-hidden">
        {/* top section */}
        <div className="flex-1 flex flex-row items-center justify-between px-2">
          <div className="w-fit">
          <Selector options={[{ label: 'All', value: VisitFilter.ALL }, 
            { label: 'Complete', value: VisitFilter.COMPLETED }, 
            { label: 'Planned', value: VisitFilter.PLANNED }, 
            { label: 'Active', value: VisitFilter.ACTIVE }]} 
            defaultValue={VisitFilter.ALL}
            onChange={(value) => setFilter(value as VisitFilter)} />
          </div>
          <div className="text-md font-medium text-[var(--lightest_pink)] cursor-pointer rounded-full px-6 py-1 bg-[var(--darker_pink)]" onClick={handleAddVisit}>
            + Add Visit
          </div>
        </div>
        {/* visits grid */}
        <div className="flex-16 min-h-0 overflow-y-auto no-scrollbar pt-5 px-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center text-md font-medium text-[var(--medium_pink)] min-w-[828px] h-full">
              Loading visits...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-x-6 gap-y-6 justify-center items-center min-w-[828px]">
                {filteredVisits.map((visit) => (
                  <VisitCard key={visit.id} visit={visit} onClick={() => handleVisitClick(visit)}/>
                ))}
              </div>
              {filteredVisits.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-md font-medium text-[var(--medium_pink)]">
                  No visits found
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Background>
  )
}

export default VisitsPage