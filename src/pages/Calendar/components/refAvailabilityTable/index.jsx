import React, { useEffect, useState } from 'react'
import { UserAuth } from 'src/contexts/AuthContext'
import { CalendarCollection } from 'src/contexts/CalendarContext'
import RefAvailabilityTableListDetails from 'src/pages/Calendar/components/refAvailabilityTableListDetails'
import Spinner from 'src/components/common/spinner'

const RefAvailabilityTable = ({ isAdmin }) => {
  const { user, userData } = UserAuth()
  const { getCalendars, addUserSelections, getCalendar, removeCalendar } =
    CalendarCollection()
  const [calendars, setCalendars] = useState([])
  const [loading, setLoading] = useState(false)
  const [reload, setReload] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const fetchCalendarData = async () => {
    setLoading(true)
    const response = await getCalendars()
    setCalendars(response)
  }

  const toggleOpen = (id) => () =>
    setIsOpen((isOpen) => (isOpen === id ? null : id))

  useEffect(() => {
    fetchCalendarData()
    setLoading(false)
  }, [reload])

  return (
    <div className="mb-5">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {calendars.map((data, index) => (
            <RefAvailabilityTableListDetails
              key={index}
              user={user}
              userData={userData}
              calendar={data}
              isAdmin={isAdmin}
              addUserSelections={addUserSelections}
              getCalendar={getCalendar}
              removeCalendar={removeCalendar}
              setReload={setReload}
              setLoading={setLoading}
              isOpen={isOpen === index}
              toggle={toggleOpen(index)}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default RefAvailabilityTable
