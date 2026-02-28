import HomeNavBar from '../components/HomeNavBar'
import Background from '../components/Background'
import Loading from './Loading'
import { useHome } from '../contexts/HomeContext'
import HomeCard from '../components/HomeCard'
import { VisitState } from '../api/backend/visits'
import RedRoundedRect from '../components/buttons/RedRoundedRect'
import { useUser } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

// icons
import { FiCalendar } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";



function HomePage() {
  const { home, loading } = useHome();
  const { couple } = useUser();
  const navigate = useNavigate();

  if (loading) {
    return <Loading />
  }

  
  if (loading) {
    return <Loading />
  }
  
  if (home === undefined) {
    return <div>No home found</div>
  }
  
  if (couple === undefined) {
    return <div>No couple found</div>
  }
  
  if (couple?.partner === undefined) {
    return <div>No partner found</div>
  }
  
  const handlePlanVisit = () => {
    navigate('/visits')
  }
  
  const handleBrowseActivities = () => {
    navigate('/activities')
  }
  
  const handleWishlist = () => {
    navigate('/wishes')
  }
  
  const unplanned = () => {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center text-5xl font-bold text-[var(--darker_pink)]">
          No Visit Planned
        </div>
        <div className="flex flex-col items-center justify-center text-3xl font-bold text-[var(--medium_pink)] max-w-120 text-center">
          Plan your next visit together to start the countdown
        </div>
        <RedRoundedRect className="gap-2 max-w-60" onClick={handlePlanVisit}>
          <FiCalendar className="text-2xl text-[var(--bg_pink)]"/>
          <div className="flex flex-col items-center justify-center">
            Plan your next visit
          </div>
        </RedRoundedRect>
      </div>
    )
  }
  const planned = () => {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center text-5xl font-bold text-[var(--darker_pink)]">
        {home.days_till} days
        </div>
        <div className="flex flex-col items-center justify-center text-3xl font-bold text-[var(--medium_pink)] max-w-120 text-center">
          until you see {couple?.partner?.name}!
        </div>

        {/* Timeline of the visit */}

        {/* Homecards */}
        <div className="flex flex-row items-center justify-center gap-20">
          <HomeCard title="Browse Activities" description="Find something fun to do for your next visit!" 
          icon={<FiSearch className="text-2xl text-[var(--darker_pink)]"/>} onClick={handleBrowseActivities} />
          <HomeCard title="Plan Visit" description="Schedule daily activities for your visit" 
          icon={<FiCalendar className="text-2xl text-[var(--darker_pink)] "/>} onClick={handlePlanVisit} />
          <HomeCard title="Wishlist" description="Browse for things your partner migh like (or add to yours)" 
          icon={<FaRegHeart className="text-2xl text-[var(--darker_pink)]"/>} onClick={handleWishlist} />
        </div>
      </div>
    )
  }
  const active = () => {
    return (
      <div>
        <h1>Active</h1>
      </div>
    )
  }

  return (
    <Background>
      <HomeNavBar />
      <div className="w-full h-full flex flex-col items-center justify-center">
        {home.state === VisitState.UNPLANNED && unplanned()}
        {home.state === VisitState.PLANNED && planned()}
        {home.state === VisitState.ACTIVE && active()}
      </div>
    </Background>
  )
}

export default HomePage