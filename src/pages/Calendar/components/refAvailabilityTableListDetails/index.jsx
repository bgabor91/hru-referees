import React, { useState, useEffect } from 'react'
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md'
import RefAvailabilitiyTableEdit from '../refAvailabiltiyTableEdit'

const RefAvailabilityTableListDetails = (props) => {
  const {
    user,
    userData,
    calendar,
    isAdmin,
    addUserSelections,
    getCalendar,
    removeCalendar,
    setReload,
    setLoading,
    isOpen,
    toggle,
  } = props
  const [changed, setChanged] = useState(false)
  const [selected, setSelected] = useState([])
  const [currentCalendar, setCurrentCalendar] = useState()

  const handleOpenCalendar = (e) => {
    e.preventDefault()
    toggle()
  }

  //console.log(isOpen)

  const isChanged = () => {
    setChanged(!changed)
  }

  const saveSelectedDates = async () => {
    let currentCalendar = {}
    try {
      await addUserSelections(
        user,
        calendar.eventName,
        selected,
        userData.displayName
      )
      currentCalendar = await getCalendar(calendar.eventName)
      setCurrentCalendar(currentCalendar)
      setChanged(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  const deleteCalendar = async (e) => {
    e.preventDefault()
    setLoading(true)
    await removeCalendar(calendar.eventName)
    setReload(true)
    setLoading(false)
  }

  const deleteChanges = (e) => {
    e.preventDefault()
    setSelected([])
    setChanged(!changed)
  }

  useEffect(() => {
    setReload(false)
  }, [])

  return (
    <div className="flex flex-col drop-shadow-md mt-5 md:mx-36 py-3 bg-white text-gray-600 text-center justify-center z-0">
      <div className="flex md:mx-36 py-3 bg-white text-center justify-center">
        <span>
          <h2 className="text-lg mr-1 font-semibold">{calendar.eventName}</h2>
        </span>
        <span className="my-auto cursor-pointer" onClick={handleOpenCalendar}>
          {!isOpen ? (
            <MdOutlineExpandMore size={24} />
          ) : (
            <MdOutlineExpandLess size={24} />
          )}
        </span>
      </div>
      {isOpen && (
        <RefAvailabilitiyTableEdit
          setSelected={setSelected}
          calendar={calendar}
          isChanged={isChanged}
          currentCalendar={currentCalendar}
        />
      )}
      {changed && (
        <div className="flex mt-5 md:mt-2 px-4 py-3 text-center sm:px-6 justify-around">
          <div>
            <button
              type="button"
              onClick={deleteChanges}
              className="inline-flex mr-4 justify-center py-2 px-4 border border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 shadow-sm text-sm font-medium rounded-md"
            >
              Mégse
            </button>
            <button
              type="submit"
              onClick={saveSelectedDates}
              className="inline-flex ml-5 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500"
            >
              Mentés
            </button>
          </div>
        </div>
      )}
      {isOpen && isAdmin && (
        <div className="px-4 py-3 text-center sm:px-6">
          <button
            type="button"
            className="inline-flex justify-center py-2 px-4 border border-transparent  text-white bg-red-700 hover:bg-red-500 shadow-sm text-sm font-medium rounded-md"
            onClick={deleteCalendar}
          >
            Esemény törlése
          </button>
        </div>
      )}
    </div>
  )
}

export default RefAvailabilityTableListDetails
