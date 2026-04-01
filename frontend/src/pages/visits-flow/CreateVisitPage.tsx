import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// components
import Background from '../../components/Background'
import PageNavBar from '../../components/PageNavBar'
import CustomDateInput from '../../components/CustomDateInput'
import { FiCalendar, FiChevronUp, FiChevronDown, FiSave, FiPlus, FiTrash2 } from 'react-icons/fi'
import AlertModal from '../../modals/AlertModal'
import { createVisit, CreateVisit } from '../../api/backend/visits'
import { CreateActivitySnapshot } from '../../api/backend/activities'
import { getDaysLength, MILLIS_IN_DAY } from '../../utils/visits'
import { CATEGORIES } from '../../utils/activities'
import { useNavigate } from 'react-router-dom'
import { useVisits } from '../../contexts/VisitsContext'


interface ActivityRow {
  name: string
  category: string
}

function CreateVisitPage() {
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [dropdown, setDropdown] = useState(false)
  const [dayActivities, setDayActivities] = useState<Record<number, ActivityRow[]>>({})
  const [alertMessage, setAlertMessage] = useState('')
  const [alertOpen, setAlertOpen] = useState(false)
  const navigate = useNavigate()
  const { addVisit } = useVisits()
  const [loadingRequest, setLoadingRequest] = useState(false)

  const addActivity = (dayIndex: number) => {
    setDayActivities(prev => ({
      ...prev,
      [dayIndex]: [...(prev[dayIndex] || []), { name: '', category: CATEGORIES[0] }]
    }))
  }

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    setDayActivities(prev => ({
      ...prev,
      [dayIndex]: (prev[dayIndex] || []).filter((_, i) => i !== activityIndex)
    }))
  }

  const updateActivity = (dayIndex: number, activityIndex: number, field: keyof ActivityRow, value: string) => {
    setDayActivities(prev => ({
      ...prev,
      [dayIndex]: (prev[dayIndex] || []).map((a, i) =>
        i === activityIndex ? { ...a, [field]: value } : a
      )
    }))
  }

  const buildSchedule = (): CreateActivitySnapshot[] => {
    if (!startDate) return []
    const snapshots: CreateActivitySnapshot[] = []
    for (const [dayIndex, activities] of Object.entries(dayActivities)) {
      const date = new Date(startDate.getTime() + Number(dayIndex) * MILLIS_IN_DAY)
      activities.forEach((a, order) => {
        if (a.name.trim()) {
          snapshots.push({
            activity_id: null,
            date: date.toISOString().split('T')[0],
            name: a.name,
            category: a.category,
            order_index: order,
          })
        }
      })
    }
    return snapshots
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!description || !startDate || !endDate) {
      setAlertMessage('Please fill in all fields')
      setAlertOpen(true)
      return;
    }

    setLoadingRequest(true)
    const request: CreateVisit = {
      description: description,
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
    }

    createVisit(request, buildSchedule()).then((visit) => {
      addVisit(visit)
      navigate(-1)
    }).catch((error) => {
      setAlertMessage(error.message)
      setAlertOpen(true)
    }).finally(() => {
      setLoadingRequest(false)
    })
  }

  return (
    <Background>
      <PageNavBar />
      <div className="flex flex-col items-center justify-center mt-20 max-w-240 w-full mx-auto flex-1 overflow-hidden px-4">
        <AlertModal 
          message={alertMessage}
          onClose={() => setAlertOpen(false)}
          isOpen={alertOpen}
        />
        <div className="flex flex-row items-center justify-between text-left w-full mb-4 pr-2">
          <h1 className="text-4xl font-bold text-[var(--darker_pink)]">
            Plan our next visit!
          </h1>
          <button className="text-md font-semibold text-[var(--bg_pink)] flex flex-row items-center gap-2 cursor-pointer bg-[var(--darker_pink)] rounded-xl px-4 py-2" 
            type="submit" form="create-visit-form" disabled={loadingRequest}>
              <FiSave className="w-6 h-6 flex-shrink-0" /> Save Visit
          </button>
        </div>
        {/* details section */}
        <form id="create-visit-form" onSubmit={handleSubmit} className="flex flex-col items-start justify-center px-10 py-8 bg-[var(--lightest_pink)] rounded-2xl gap-2 w-full shrink-0">
          <h2 className="text-xl font-bold text-[var(--darker_pink)]">
            Description
          </h2>
          <input
            type="text"
            className="w-full rounded-xl px-4 py-2 bg-[var(--dark-medium-pink)]
            outline-none transition-shadow text-md font-bold text-[var(--darker_pink)]
            min-h-12"
            placeholder="e.g. Trip to Japan"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />


          {/* date picker section */}
          <div className="flex flex-row items-start justify-start gap-6 w-full">
            <div className="flex flex-col items-start justify-start gap-1">
              <h2 className="text-xl font-bold text-[var(--darker_pink)]">
                Start Date
              </h2>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                customInput={<CustomDateInput />}
                placeholderText="mm/dd/yy"
                dateFormat="MM/dd/yy"
                portalId="root"
                maxDate={endDate || undefined}
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-1">
              <h2 className="text-xl font-bold text-[var(--darker_pink)]">
                End Date
              </h2>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                customInput={<CustomDateInput />}
                placeholderText="mm/dd/yy"
                dateFormat="MM/dd/yy"
                minDate={startDate || undefined}
                portalId="root"
              />
            </div>
          </div>
        </form>
        {/* schedule section */}
        <div className={`flex flex-col items-start justify-start py-8 px-10 bg-[var(--lightest_pink)] rounded-2xl mt-6 mb-4 gap-4 w-full overflow-hidden ${dropdown && startDate && endDate ? 'flex-1 min-h-0' : ''}`}>
          <div className="flex flex-row items-center justify-between w-full">
              <h2 className="text-2xl font-bold text-[var(--darker_pink)] flex flex-row items-center gap-2">
                <FiCalendar className="w-7 h-7 flex-shrink-0" />
                Schedule (Optional)
              </h2>
              <button
                type="button"
                className="text-sm font-bold text-[var(--medium_pink)] flex flex-row items-center gap-1 cursor-pointer"
                onClick={() => setDropdown(!dropdown)}
              >
                {dropdown ? 'Hide schedule' : 'Add schedule now'}
                {dropdown ? <FiChevronUp className="w-5 h-5 flex-shrink-0" /> : <FiChevronDown className="w-5 h-5 flex-shrink-0" />}
              </button>
          </div>
          {dropdown && startDate && endDate && (
            <div className="flex flex-col gap-4 w-full mt-2 pb-4 flex-1 min-h-0 overflow-y-auto pink-scrollbar">
              {Array.from({ length: getDaysLength(startDate, endDate) }, (_, dayIndex) => (
                <div key={dayIndex} className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold text-[var(--darker_pink)]">
                    Day {dayIndex + 1} ({new Date(startDate.getTime() + dayIndex * MILLIS_IN_DAY).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                  </h3>
                  {(dayActivities[dayIndex] || []).map((activity, actIdx) => (
                    <div key={actIdx} className="flex flex-row items-center gap-3 w-full">
                      <span className="text-sm font-semibold text-[var(--darker_pink)] shrink-0">Activity:</span>
                      <input
                        type="text"
                        value={activity.name}
                        onChange={(e) => updateActivity(dayIndex, actIdx, 'name', e.target.value)}
                        placeholder="e.g. Go on a hike"
                        className="flex-1 min-w-0 rounded-xl px-3 py-2 bg-[var(--dark-medium-pink)] outline-none text-sm font-bold text-[var(--darker_pink)] placeholder:text-[var(--medium_pink)]"
                      />
                      <span className="text-sm font-semibold text-[var(--darker_pink)] shrink-0">Category:</span>
                      <select
                        value={activity.category}
                        onChange={(e) => updateActivity(dayIndex, actIdx, 'category', e.target.value)}
                        className="rounded-xl px-3 py-2 bg-[var(--dark-medium-pink)] outline-none text-sm font-bold text-[var(--darker_pink)] cursor-pointer"
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeActivity(dayIndex, actIdx)}
                        className="text-[var(--medium_pink)] hover:text-[var(--darker_pink)] cursor-pointer transition-colors"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addActivity(dayIndex)}
                    className="flex flex-row items-center gap-1 text-sm font-semibold text-[var(--medium_pink)] hover:text-[var(--darker_pink)] cursor-pointer transition-colors bg-[var(--dark-medium-pink)] rounded-xl px-3 py-1.5 w-fit"
                  >
                    <FiPlus className="w-4 h-4" /> add activity
                  </button>
                </div>
              ))}
            </div>
          )}
          {dropdown && (!startDate || !endDate) && (
            <p className="text-sm font-semibold text-[var(--medium_pink)] text-center w-full">
              Select start and end dates first to build a schedule.
            </p>
          )}
        </div>
      </div>
    </Background>
  )
}

export default CreateVisitPage
