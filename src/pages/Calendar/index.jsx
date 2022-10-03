import React, { useState } from 'react'
import RefAvailabilityCalendar from '../../components/refAvailabilityCalendar'
import RefAvailabilityTable from '../../components/refAvailabiltyTable'
import { UserAuth } from '../../components/context/AuthContext'

const ADMIN = 'admin'

const Calendar = () => {
  const { userData } = UserAuth()
  const [editMode, setEditMode] = useState(false)

  const isAdmin = userData?.role === ADMIN

  const handleEditMode = (e) => {
    e.preventDefault()
    setEditMode(true)
  }

  const resetEditMode = () => {
    setEditMode(false)
  }

  return (
    <div className="mt-5 md:mt-10 text-center text-gray-600">
      <h1 className="text-2xl font-bold mb-2 md:mb-10">
        Játékvezető elérhetőség
      </h1>
      {isAdmin && !editMode && (
        <div className="mt-10 px-4 py-3 text-center sm:px-6">
          <button
            type="button"
            onClick={handleEditMode}
            className="inline-flex justify-center mb-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500"
          >
            + Új létrehozása
          </button>
        </div>
      )}
      {editMode ? (
        <RefAvailabilityCalendar
          isAdmin={isAdmin}
          resetEditMode={resetEditMode}
        />
      ) : (
        <RefAvailabilityTable isAdmin={isAdmin} />
      )}
    </div>
  )
}

export default Calendar
