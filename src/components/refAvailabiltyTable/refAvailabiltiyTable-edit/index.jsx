import React, { useState, useEffect } from 'react'
import { UserAuth } from '../../context/AuthContext'
import {
  MdModeEditOutline,
  MdOutlineDoneOutline,
  MdOutlineCancel,
} from 'react-icons/md'
import ChkdImage from '../../../assets/images/checked.png'
import UnChkdImage from '../../../assets/images/unchecked.png'

const RefAvailabilitiyTableEdit = (props) => {
  const { user, userData } = UserAuth()
  const { calendar, setSelected, currentCalendar, isChanged } = props
  const [isEdit, setIsEdit] = useState(false)
  const [selectedDate, setSelectedDate] = useState([])
  const [restOfUserSelection, setRestOfUserSelection] = useState([])
  const [loggedinUser, setLoggedinUser] = useState([])
  const dates = calendar.matchDays
  const userSelections = calendar.userSelections || []

  const cursorState = isEdit
    ? 'cursor-pointer border-solid border-2 md:border border-gray-400 rounded-md'
    : ''

  const createNewTableRows = () => {
    let users = []
    let currentUser = []

    currentCalendar
      ? (users = [...currentCalendar.userSelections])
      : (users = [...userSelections])

    users.forEach((selection) => {
      if (selection.uid === user.uid) {
        users.splice(userSelections.indexOf(selection), 1)
        currentUser.push(selection)
        setSelectedDate(currentUser[0].selected)
      }
    })

    setRestOfUserSelection(users)
    setLoggedinUser(currentUser)
  }

  const handleDateSelect = (date) => {
    if (!isEdit) {
      return
    } else {
      let selectedDays = [...selectedDate]

      if (!selectedDays.includes(date)) {
        selectedDays = [...selectedDate, date]
      } else {
        selectedDays.splice(selectedDate.indexOf(date), 1)
      }

      setSelectedDate(selectedDays)
      setSelected(selectedDays)
    }
  }

  const handleOnEdit = (e) => {
    e.preventDefault()
    setIsEdit(!isEdit)
  }

  const showSaveButton = (e) => {
    e.preventDefault()
    setIsEdit(!isEdit)
    isChanged()
  }

  const cancelEdit = (e) => {
    e.preventDefault()
    setIsEdit(!isEdit)
    loggedinUser[0].selected
      ? setSelectedDate(loggedinUser[0].selected)
      : setSelectedDate([])
  }

  useEffect(() => {
    createNewTableRows()
  }, [calendar])

  return (
    <div className="flex flex-col md:mx-2 my-5 md:justify-center overflow-x-auto relative z-1">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-300">
          <tr>
            <th scope="col" className="py-2 px-2 text-center">
              Név
            </th>
            {dates.map((date) => (
              <th scope="col" className="py-3 px-2 text-center" key={date}>
                {date}
              </th>
            ))}
            <th scope="col" className="py-2 px-2 text-center">
              <p>Módosítás</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {loggedinUser && (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100">
              <th className="py-3 text-center">
                <p className="flex justify-center">{userData.displayName}</p>
              </th>
              {dates.map((date) => (
                <td
                  className="py-3 px-2 text-center"
                  key={date}
                  onClick={() => handleDateSelect(date)}
                >
                  <div
                    className={`flex justify-center py-[2px] ${cursorState}`}
                  >
                    {selectedDate.includes(date) ? (
                      <img className="h-6 w-6" src={ChkdImage} alt="logo" />
                    ) : (
                      <img className="h-6 w-6" src={UnChkdImage} alt="logo" />
                    )}
                  </div>
                </td>
              ))}
              <td className="py-3 px-2 text-center">
                <div className="flex justify-center cursor-pointer">
                  {!isEdit ? (
                    <MdModeEditOutline size={20} onClick={handleOnEdit} />
                  ) : (
                    <span className="flex justify-around">
                      <MdOutlineCancel
                        className="mr-2"
                        onClick={cancelEdit}
                        size={20}
                      />
                      <MdOutlineDoneOutline
                        className="ml-2"
                        onClick={showSaveButton}
                        size={20}
                      />
                    </span>
                  )}
                </div>
              </td>
            </tr>
          )}
          {restOfUserSelection.map((userSelection) => (
            <tr
              key={userSelection.uid}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100"
            >
              <th className="py-3 text-center">
                <p className="flex justify-center">
                  {userSelection.displayName}
                </p>
              </th>
              {dates.map((date) => (
                <td className="py-3 px-2 text-center" key={date}>
                  <div className="flex justify-center py-[2px]">
                    {userSelection.selected.includes(date) ? (
                      <img className="h-6 w-6" src={ChkdImage} alt="logo" />
                    ) : (
                      <img className="h-6 w-6" src={UnChkdImage} alt="logo" />
                    )}
                  </div>
                </td>
              ))}
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RefAvailabilitiyTableEdit
