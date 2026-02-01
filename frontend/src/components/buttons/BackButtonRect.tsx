import { useNavigate } from 'react-router-dom'

function BackButtonRect() {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex flex-row bg-[var(--darker_pink)] text-[var(--lightest_pink)] font-medium text-lg px-6 py-2 
                          rounded-xl justify-center items-center cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity select-none shadow-xl"
            onClick={handleBack}>
              Back
            </div>
  )
}

export default BackButtonRect