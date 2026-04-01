import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';

// components
import Background from '../../components/Background'
import PageNavBar from '../../components/PageNavBar'

// contexts
import { useVisits } from '../../contexts/VisitsContext';

// utils
import { dayNumberFromIndex, formatDayDate, getDaysLength } from '../../utils/visits';

// api
import { ActivitySnapshot, CreateActivitySnapshot, getActivitySnapshots } from '../../api/backend/activities';

// mock data
import mockActivities from './mock-activities.json';
import { FiSave, FiTrash } from 'react-icons/fi';
import VisitAddActivityModal from '../../modals/VisitAddActivityModal';
import { saveSchedule } from '../../api/backend/visits';

function VisitSchedulePage() {
  const { visits } = useVisits();
  const { id } = useParams();
  const visit = id ? visits.find((v) => v.id === parseInt(id)) : undefined;
  const [schedule, setSchedule] = useState<(ActivitySnapshot | CreateActivitySnapshot)[]>([]); // Change to empty array when API is implemented
  const [toDelete, setToDelete] = useState<ActivitySnapshot[]>([]);
  const [loading, setLoading] = useState(true);

  const [submitDisabled, setSubmitDisabled] = useState(false);

  // add activity modal state
  const [dayIndex, setDayIndex] = useState(0);
  const [addActivityModalOpen, setAddActivityModalOpen] = useState(false);

  useEffect(() => {
    if (visit) {
      getActivitySnapshots(visit.id).then((snapshots) => {
        setSchedule(snapshots);
      }).then(() => {
        setLoading(false);
      }).catch((error) => {
        console.error('Error fetching activity snapshots:', error);
      });
    }
    console.log(schedule);
  }, [visit]);

  if (!visit) {
    return <Navigate to="/visits" />;
  }

  const handleAddActivity = (dayIndex: number) => {
    setDayIndex(dayIndex);
    setAddActivityModalOpen(true);
  }

  const handleModalAddActivity = (name: string, category: string) => {
    const maxOrderIndex = Math.max(...schedule.map(a => a.order_index));
    const activity: CreateActivitySnapshot = {
      activity_id: null,
      name: name,
      category: category,
      date: formatDayDate(new Date(visit.start), dayIndex),
      order_index: maxOrderIndex === -Infinity ? 0 : maxOrderIndex + 1,
    }
    setSchedule(prev => [...prev, activity]);
    setAddActivityModalOpen(false);
  }

  const handleRemoveActivity = (activity: ActivitySnapshot | CreateActivitySnapshot) => {
    if ('id' in activity) {
      setToDelete(prev => [...prev, activity]);
      setSchedule(prev => prev.filter(a => !('id' in a) || a.id !== activity.id));
    } else {
      setSchedule(prev => prev.filter(a => a !== activity));
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitDisabled(true);
    const toAdd = schedule.filter(a => !('id' in a));
    saveSchedule(visit.id, toAdd, toDelete).then(() => {
      console.log("schedule saved");
    }).catch((error) => {
      console.error("error saving schedule:", error);
    }).finally(() => {
      setSubmitDisabled(false);
    });
  }

  return (
    <Background>
      <PageNavBar />
      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-20 max-w-[60rem] w-full gap-4 flex-1 overflow-hidden">
        <div className="flex flex-row items-center justify-between w-7/10">
          <h1 className="text-4xl font-bold text-pink-dark text-left w-full">Visit Schedule</h1>
          <button className="text-md font-semibold text-pink-light flex flex-row items-center justify-center gap-2 cursor-pointer bg-pink-dark rounded-xl px-4 py-2 hover:opacity-80 active:opacity-60 transition-opacity"
            type="submit" disabled={submitDisabled}>
            <FiSave className="w-6 h-6" /> Save
          </button>
        </div>
        <ol className="flex flex-col items-center w-7/10 rounded-xl gap-6 min-w-120 overflow-y-auto pink-scrollbar min-h-0 flex-1 pt-2 pb-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center w-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-dark"></div>
              <p className="text-sm font-semibold text-[var(--medium_pink)]">Loading schedule...</p>
            </div>
          ) : (
            Array.from({ length: getDaysLength(new Date(visit.start), new Date(visit.end)) }, (_, index) => (
              <li key={index} className="flex flex-col items-center justify-center w-full bg-pink-light rounded-2xl px-8 py-6">
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-row items-center justify-center w-fit gap-4">
                    <h2 className="text-3xl text-left font-bold text-pink-dark">Day {dayNumberFromIndex(index)}</h2>
                    <h3 className="text-lg text-left font-bold text-pink-medium">{formatDayDate(new Date(visit.start), dayNumberFromIndex(index))}</h3>
                  </div>
                  <button className="text-lg font-medium text-pink-light bg-pink-dark rounded-4xl px-4 py-1 hover:opacity-80 active:opacity-60 transition-opacity select-none cursor-pointer"
                    onClick={() => handleAddActivity(index)}
                    type="button">
                    + Add Activity
                  </button>
                </div>
                <div className="flex flex-col items-center justify-center w-full divide-y-2 divide-pink-dark overflow-y-auto pink-scrollbar">
                  {(() => {
                    const activitiesForDay = schedule.filter(
                      (activity) => new Date(activity.date).getDate() === new Date(visit.start).getDate() + index
                    ).sort((a, b) => a.order_index - b.order_index);
                    return activitiesForDay.length === 0 ? (
                      <p className="text-sm font-medium text-pink-medium py-2">No activities planned for this day.</p>
                    ) : (
                      activitiesForDay.map((activity, i) => (
                        <div key={'id' in activity ? activity.id : `unsaved-${i}`} className="flex flex-row items-center justify-between w-full py-2">
                          <div className="flex flex-row items-center justify-center w-fit gap-4">
                            <h3 className="text-md font-bold text-pink-dark bg-pink-bg rounded-full px-4">{activity.category}</h3>
                            <h3 className="text-xl font-bold text-pink-dark">{activity.name}</h3>
                          </div>
                          <button className="text-lg font-medium text-pink-light bg-pink-dark rounded-lg px-1 py-1 hover:opacity-80 active:opacity-60 transition-opacity select-none cursor-pointer"
                            onClick={() => handleRemoveActivity(activity)}
                            type="button">
                            <FiTrash className="w-7 h-7" />
                          </button>
                        </div>
                      ))
                    );
                  })()}
                </div>
              </li>
            ))
          )}
        </ol>
      </form>
      <VisitAddActivityModal onClose={() => setAddActivityModalOpen(false)} isOpen={addActivityModalOpen} dayIndex={dayIndex} onAddActivity={handleModalAddActivity} />
    </Background>
  )
}

export default VisitSchedulePage