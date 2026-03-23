import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// components
import Background from '../../components/Background'
import PageNavBar from '../../components/PageNavBar'
import CustomDateInput from '../../components/CustomDateInput'

function CreateVisitPage() {
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [dropdown, setDropdown] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(description, startDate, endDate)
  }

  return (
    <Background>
      <PageNavBar />
      <div className="flex flex-col items-center justify-center mt-20 max-w-240 mx-auto h-full">
        <div className="flex flex-col items-start justify-start text-left w-full mb-4">
          <h1 className="text-4xl font-bold text-[var(--darker_pink)]">
            Plan our next visit!
          </h1>
        </div>
        {/* details section */}
        <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center px-10 py-6 bg-[var(--lightest_pink)] rounded-2xl gap-2">
          <h2 className="text-xl font-bold text-[var(--darker_pink)]">
            Description
          </h2>
          <input
            type="text"
            className="w-full rounded-xl px-4 py-2 bg-[var(--dark-medium-pink)] focus:ring-2 focus:ring-[var(--darker_pink)] transition-all duration-400
            outline-none transition-shadow text-md font-bold text-[var(--darker_pink)]
            min-h-12 min-w-120"
            placeholder="e.g. Sushi Night"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-row items-start justify-start gap-6">
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
        <div className="flex flex-col items-start justify-start gap-2">
          {dropdown && (
            <div className="flex flex-col items-start justify-start gap-2">
              <h2 className="text-xl font-bold text-[var(--darker_pink)]">
                Dropdown
              </h2>
            </div>
          )}
        </div>
      </div>
    </Background>
  )
}

export default CreateVisitPage
