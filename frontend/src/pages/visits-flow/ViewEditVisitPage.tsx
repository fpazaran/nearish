import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// components
import Background from '../../components/Background'
import PageNavBar from '../../components/PageNavBar'

// utils
import { formatDateRange, getVisitStatus, getDaysAway, getDaysLength } from '../../utils/visits'

// contexts
import { useVisits } from '../../contexts/VisitsContext'
import { FiCalendar, FiCamera, FiEdit, FiTrash } from 'react-icons/fi'
import { FaLocationDot } from 'react-icons/fa6'
import { BsArrowRight } from 'react-icons/bs'
import DeleteItemModal from '../../modals/DeleteItemModal'

// api
import { deleteVisit } from '../../api/backend/visits'

function ViewEditVisitPage() {
  const { visits } = useVisits();
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const visit = id ? visits.find((v) => v.id === parseInt(id)) : undefined;
  const status = visit ? getVisitStatus(visit) : undefined;
  const daysAway = visit ? getDaysAway(visit) : undefined;

  const deleteModalMessage = `Are you sure you want to delete this visit? This action cannot be undone.`;

  useEffect(() => {
    if (!visit) {
      navigate('/visits');
    }
  }, [visit])

  const handleViewSchedule = () => {
    navigate(`/visits/${visit?.id}/schedule`);
  }

  const handleViewMemories = () => {
    navigate(`/visits/${visit?.id}/memories`);
  }

  const handleEditVisit = () => {
    // TODO: Implement edit visit
    console.log('Edit visit');
  }

  if (!visit) return null;

  const handleDeleteVisit = () => {
    deleteVisit(visit.id).then(() => {
      navigate('/visits');
    }).catch((error) => {
      console.error('Error deleting visit:', error);
    }).finally(() => {
      setDeleteModalOpen(false);
    });
  }

  return (
    <Background>
      <PageNavBar />
      <div className="flex flex-col items-center justify-center mt-20 max-w-[60rem] w-full mx-auto">
        <div className="flex flex-row items-center justify-end gap-4 w-7/10 rounded-xl py-4">
          <button className="items-center justify-center gap-2 text-pink-light bg-pink-dark rounded-xl p-2 hover:opacity-80 active:opacity-60 transition-opacity select-none cursor-pointer"
            onClick={handleEditVisit}>
            <FiEdit className="w-6 h-6" />
          </button>
          <button className="items-center justify-center gap-2 text-pink-light bg-pink-dark rounded-xl p-2 hover:opacity-80 active:opacity-60 transition-opacity select-none cursor-pointer"
            onClick={() => setDeleteModalOpen(true)}>
            <FiTrash className="w-6 h-6" />
          </button>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-5 px-8 py-6 bg-[var(--lightest_pink)] rounded-2xl w-7/10"
        >
          <div className="flex items-center justify-between w-full bg-dark">
            <h1 className="text-4xl font-bold text-pink-dark">
              {visit.description}
            </h1>
            <h3 className="text-pink-dark bg-pink-medium-dark rounded-full px-4 text-md font-medium mt-2">
              {status}
            </h3>
          </div>
          <div className="w-full flex flex-row items-center justify-between gap-2">
              <h2 className="flex flex-row items-center gap-2 text-pink-dark text-lg font-bold">
                <FiCalendar className="w-6 h-6 flex-shrink-0 text-pink-dark" />{formatDateRange(visit.start, visit.end)}
              </h2>
              <h2 className="flex flex-row items-center gap-2 text-pink-dark text-lg font-bold">
                <FaLocationDot className="w-6 h-6 text-pink-dark" /> {daysAway} days away
              </h2>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-7/10 gap-10 mt-10">
          <button className="flex-1 flex flex-row px-6 py-4 bg-pink-dark rounded-2xl cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity select-none shadow-xl"
            onClick={handleViewSchedule}>
            <span className="flex-3 flex flex-col items-start gap-1">
              <h1 className="text-lg font-medium text-pink-light">
                Daily Schedule
              </h1>
              <p className="text-sm font-medium text-pink-bg text-left">
                Plan your activities for your {getDaysLength(new Date(visit.start), new Date(visit.end))} day visit.
              </p>
              <h4 className="text-xs font-medium text-pink-light text-left flex flex-row items-center gap-2 mt-4">
                View Schedule <BsArrowRight className="w-4 h-4 text-pink-light" />
              </h4>
            </span>
            <div className="flex-2 flex items-start justify-end">
              <FiCalendar className="w-6 h-6 text-pink-light" />
            </div>
          </button>
          <button className="flex-1 flex flex-row px-6 py-4 bg-pink-dark rounded-2xl cursor-pointer hover:opacity-80 active:opacity-60 transition-opacity select-none shadow-xl" 
            onClick={handleViewMemories}>
            <span className="flex-3 flex flex-col items-start gap-1">
              <h1 className="text-lg font-medium text-pink-light">
                Memories
              </h1>
              <p className="text-sm font-medium text-pink-bg text-left">
                Save and view memories from this trip.
              </p>
              <h4 className="text-xs font-medium text-pink-light text-left flex flex-row items-center gap-2 mt-4">
                View Memories <BsArrowRight className="w-4 h-4 text-pink-light" />
              </h4>
            </span>
            <div className="flex-2 flex items-start justify-end">
              <FiCamera className="w-6 h-6 text-pink-light" />
            </div>
          </button>
        </div>
      </div>
      <DeleteItemModal message={deleteModalMessage} onClose={() => setDeleteModalOpen(false)} isOpen={deleteModalOpen} onDelete={handleDeleteVisit} />
    </Background>
  );
}


export default ViewEditVisitPage