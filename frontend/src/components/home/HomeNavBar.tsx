import { useNavigate } from 'react-router-dom'
import TextButton from '../buttons/TextButton'

function HomeNavBar() {
  const navigate = useNavigate()
  const handleActivities = () => {
    navigate('/activities')
  }
  const handleVisits = () => {
    navigate('/visits')
  }
  const handleWishes = () => {
    navigate('/wishes')
  }
  return (
    <div className='w-full h-16 absolute top-0 left-0 pt-4 px-6 flex flex-row items-center justify-center'>
      <div className="absolute top-0 left-0 mt-4 mx-6 text-4xl font-medium text-[var(--darker_pink)]">
        nearish
      </div>
      <div className="flex flex-row gap-12">
        <TextButton text="Activities" onClick={handleActivities} />
        <TextButton text="Visits" onClick={handleVisits} />
        <TextButton text="Wishes" onClick={handleWishes} />
      </div>
    </div>
  )
}

export default HomeNavBar