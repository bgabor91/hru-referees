import React, { useState } from 'react'
import RefAvailabilityCalendar from './components/refAvailabilityCalendar'
import RefAvailabilityTable from './components/refAvailabilityTable'
import { UserAuth } from 'src/contexts/AuthContext'
import PrimaryButton from 'src/components/common/primaryButton'

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
    <div className="mt-5 md:mt-10 text-center px-4 md:px-0 text-gray-600">
      <h1 className="text-2xl font-bold mb-2 md:mb-10">
        Játékvezető elérhetőség
      </h1>
      {isAdmin && !editMode && (
        <div className="mt-10 px-4 py-3 text-center sm:px-6">
          <PrimaryButton text={'+ Új létrehozása'} onClick={handleEditMode} />
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
