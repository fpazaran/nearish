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
      <div className="flex flex-col justify-center items-center h-7/10">
        {/* top section */}
        <div className="flex-1 w-207">
          <div className='h-10 flex flex-row justify-between'>
            {/* selector */}
            <Selector
              options={[
                { label: 'All', value: 'all' },
                { label: 'Complete', value: 'complete' },
                { label: 'Planned', value: 'planned' },
              ]}
              defaultValue="all"
              onChange={(value) => setFilter(value)}
            />
            {/* add visit button */}
            <button
              onClick={handleAddVisit}
              className="flex flex-row items-center gap-2 bg-[var(--darker_pink)] text-white font-medium px-5 py-2 rounded-full transition-all duration-300 ease-in-out hover:opacity-80 active:opacity-60 cursor-pointer select-none"
            >
              <FaPlus className="text-sm" />
              Add Visit
            </button>
          </div>
        </div>
        {/* visits list */}
        {filteredVisits.length > 0 ? (
          <div className="flex-20 w-245 px-20 mt-5 overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-3 gap-x-6 gap-y-6 justify-items-start items-start">
              {filteredVisits.map((visit) => (
                <VisitCard key={visit.id} visit={visit} onClick={() => handleVisitClick(visit)}/>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-5 flex items-center justify-center text-[var(--medium_pink)] text-lg font-medium">
            No visits found
          </div>
        )}
      </div>
    </Background>
  )
}

export default VisitsPage