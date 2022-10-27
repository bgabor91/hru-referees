import React, { useState, useEffect } from 'react'
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md'
import RefAvailabilitiyTableEdit from '../refAvailabiltiyTableEdit'
import PrimaryButton from 'src/components/common/primaryButton'
import OutlinedButton from 'src/components/common/outlinedButton'
import DeleteButton from 'src/components/common/deleteButton'

const RefAvailabilityTableListDetails = ({
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
}) => {
  const [changed, setChanged] = useState(false)
  const [selected, setSelected] = useState([])
  const [currentCalendar, setCurrentCalendar] = useState()

  const handleOpenCalendar = (e) => {
    e.preventDefault()
    toggle()
  }

  const isChanged = () => {
    setChanged(!changed)
  }
  const saveSelectedDates = async () => {
    let currentCalendar = {}
    try {
      await addUserSelections(user, calendar.id, selected, userData.displayName)
      currentCalendar = await getCalendar(calendar.id)
      setCurrentCalendar(currentCalendar)
      setChanged(false)
    } catch (error) {
      console.error(error.message)
    }
  }

  const deleteCalendar = async (e) => {
    e.preventDefault()
    setLoading(true)
    await removeCalendar(calendar.id)
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
            <span className="mr-2">
              <OutlinedButton
                type={'button'}
                onClick={deleteChanges}
                text={'Mégse'}
              />
            </span>
            <span className="ml-2">
              <PrimaryButton
                type={'submit'}
                text={'Mentés'}
                onClick={saveSelectedDates}
              />
            </span>
          </div>
        </div>
      )}
      {isOpen && isAdmin && (
        <div className="px-4 py-3 text-center sm:px-6">
          <DeleteButton
            type={'button'}
            onClick={deleteCalendar}
            text={'Esemény törlése'}
          />
        </div>
      )}
    </div>
  )
}

export default RefAvailabilityTableListDetails
