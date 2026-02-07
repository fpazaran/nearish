import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function PageNavBar() {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/home')
  }
  return (
    <div className='w-full h-16 absolute top-0 left-0 pt-4 px-6 flex flex-row items-center justify-center gap-4'>
      <div className="flex-1 flex flex-row items-center justify-start gap-4 max-w-200">
        <IoMdArrowRoundBack className='text-4xl text-[var(--darker_pink)] transition-opacity duration-300 ease-in-out active:opacity-20'
        onClick={handleBack}
        />
        <div className="pb-2 text-4xl font-medium text-[var(--darker_pink)]">
          nearish
        </div>
      </div>
    </div>
  )
}

export default PageNavBar