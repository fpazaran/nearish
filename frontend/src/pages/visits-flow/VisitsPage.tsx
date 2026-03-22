import React, { useEffect, useState } from 'react'
import Background from '../../components/Background'
import PageNavBar from '../../components/PageNavBar'
import { Visit } from '../../api/backend/visits'
import { getVisits } from '../../api/backend/visits';
import Loading from '../Loading';
import VisitCard from '../../components/visits/VisitCard';
import mockVisits from './mock-visits.json';
import { FaPlus } from 'react-icons/fa';
import Selector from '../../components/Selector';
import { useNavigate } from 'react-router-dom';
import TextButton from '../../components/buttons/TextButton';

type VisitFilter = 'all' | 'complete' | 'planned'

function VisitsPage() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<VisitFilter>('all')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVisits = async () => {
      setLoading(true)
      try {
        const visits = await getVisits()
        setVisits(visits)
      } catch (error) {
        console.error("Error fetching visits:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchVisits()
  }, [])

  if (loading) {
    return <Loading />
  }

  const handleVisitClick = (visit: Visit) => {
    // TODO: navigate to ViewEditVisitPage
    console.log(visit)
  }

  const handleAddVisit = () => {
    navigate('/visits/add')
  }

  const filteredVisits = visits.filter((visit) => {
    if (filter === 'all') return true
    const now = new Date()
    const end = new Date(visit.end + 'T00:00:00')
    if (filter === 'complete') return end < now
    return end >= now
  })

  return (
    <Background>
      <PageNavBar />
      <div className="flex-1 flex flex-col mt-20 mb-10 w-fit mx-auto overflow-y-hidden">
        {/* top section */}
        <div className="flex-1 flex flex-row items-center justify-between px-2">
          <div className="w-fit">
          <Selector options={[{ label: 'All', value: 'all' }, 
            { label: 'Complete', value: 'complete' }, 
            { label: 'Planned', value: 'planned' }]} 
            defaultValue='all'
            onChange={setFilter} />
          </div>
          <div className="text-md font-medium text-[var(--lightest_pink)] cursor-pointer rounded-full px-6 py-1 bg-[var(--darker_pink)]" onClick={handleAddVisit}>
            + Add Visit
          </div>
        </div>
        {/* visits grid */}
        <div className="flex-16 min-h-0 overflow-y-auto no-scrollbar pt-5 px-2">
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
        </div>
      </div>
    </Background>
  )
}

export default VisitsPage