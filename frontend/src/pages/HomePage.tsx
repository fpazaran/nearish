import HomeNavBar from '../components/HomeNavBar'
import Background from '../components/Background'
import Loading from './Loading'
import { useHome } from '../contexts/HomeContext'

function HomePage() {
  const { home, loading } = useHome()
  
  if (loading) {
    return <Loading/>
  }

  return (
    <Background>
      <HomeNavBar />
      <div className="w-full h-full flex flex-col items-center justify-center">
      </div>
    </Background>
  )
}

export default HomePage