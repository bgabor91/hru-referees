import React, { useState, useEffect, useRef } from 'react'
import DatePicker from 'react-multi-date-picker'
import weekends from 'react-multi-date-picker/plugins/highlight_weekends'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { teams, types, genderOptions, ages, venues, hours } from '../data'
import { UserAuth } from '../../context/AuthContext'
import { MatchCollection } from '../../context/MatchContext'

const defaultFormFields = {
  home: '',
  away: '',
  type: '',
  gender: '',
  age: '',
  venue: '',
  referee: '',
  assist1: '',
  assist2: '',
  date: '',
  time: '',
}

const format = 'YYYY/MM/DD'
const mainPosition = 'bottom'
const relativePosition = 'center'
const weekDays = ['Va', 'Hé', 'Ke', 'Sze', 'Csü', 'Pé', 'Szo']
const months = [
  'Jan',
  'Feb',
  'Már',
  'Ápr',
  'Máj',
  'Jún',
  'Júl',
  'Aug',
  'Szep',
  'Okt',
  'Nov',
  'Dec',
]

const MatchDetailsEdit = (props) => {
  const { resetEditMode, allMatches } = props
  const { getAllUsers } = UserAuth()
  const { createNewMatch } = MatchCollection()
  const [formFields, setFormFields] = useState(defaultFormFields)
  const [allUsers, setAllUsers] = useState([])
  const [edited, setEdited] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const hoursArr = hours
  const datePickerRef = useRef()
  const {
    home,
    away,
    type,
    gender,
    age,
    venue,
    referee,
    assist1,
    assist2,
    date,
    time,
  } = formFields

  const CustomDaysInput = ({ openCalendar, value }) => {
    return (
      <input
        type="text"
        value={value}
        readOnly
        placeholder="--Válassz dátumot--"
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        onFocus={openCalendar}
      />
    )
  }

  const fetchUsers = async () => {
    const response = await getAllUsers()
    setAllUsers(response)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (home === away) {
      console.log(home + '  ' + away)
      toast.error('A hazai és a vendég csapat nem lehet ugyanaz', {
        position: toast.POSITION.BOTTOM_CENTER,
      })
      return
    }

    if (
      (referee !== '' && assist1 !== '' && referee === assist1) ||
      (referee !== '' && assist2 !== '' && referee === assist2) ||
      (assist2 !== '' && assist1 !== '' && assist2 === assist1)
    ) {
      toast.error('A nevek nem egyezhetnek meg', {
        position: toast.POSITION.BOTTOM_CENTER,
      })
      return
    }

    if (type === '7s' && date !== '' && time !== '' && venue !== '') {
      try {
        await createNewMatch(formFields)
        resetFormFields()
        resetEditMode()
      } catch (error) {
        console.error(error.message)
      }
    } else if (
      home !== '' &&
      away !== '' &&
      date !== '' &&
      time !== '' &&
      venue !== ''
    ) {
      try {
        await createNewMatch(formFields)
        resetFormFields()
        resetEditMode()
      } catch (error) {
        console.error(error.message)
      }
    } else {
      toast.error('Kérlek, tölts ki minden kötelező mezőt', {
        position: toast.POSITION.BOTTOM_CENTER,
      })
    }
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleDateChange = () => {
    setFormFields({ ...formFields, date: selectedDate?.format() })
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
    setEdited(true)
  }

  useEffect(() => {
    fetchUsers()
    console.log(allMatches)
  }, [])

  useEffect(() => {
    handleDateChange()
  }, [selectedDate])

  return (
    <div className="mt-5  mb-6 lg:mx-36 md:mt-0 bg-white md:text-left">
      <form onSubmit={handleSubmit}>
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="home"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hazai:
                </label>
                <select
                  id="home"
                  name="home"
                  autoComplete="home"
                  value={home}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e)
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz egyesületet--
                  </option>
                  {teams.map((team, id) => (
                    <option key={id}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="away"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vendég:
                </label>
                <select
                  id="away"
                  name="away"
                  autoComplete="away"
                  value={away}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e)
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz egyesületet--
                  </option>
                  {teams.map((team, id) => (
                    <option key={id}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Típus:
                </label>
                <select
                  id="type"
                  name="type"
                  autoComplete="type"
                  value={type}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e)
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz típust--
                  </option>
                  {types.map((type, id) => (
                    <option key={id}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Neme:
                </label>
                <select
                  id="gender"
                  name="gender"
                  autoComplete="gender"
                  value={gender}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e)
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz nemet--
                  </option>
                  {genderOptions.map((data, id) => (
                    <option key={id}>{data.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Korosztály:
                </label>
                <select
                  id="age"
                  name="age"
                  autoComplete="age"
                  value={age}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e)
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz korosztályt--
                  </option>
                  {ages.map((age, id) => (
                    <option key={id}>{age.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="venue"
                  className="block text-sm font-medium text-gray-700"
                >
                  Helyszín:
                </label>
                <select
                  id="venue"
                  name="venue"
                  autoComplete="venue"
                  value={venue}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e)
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz helyszínt--
                  </option>
                  {venues.map((venue, id) => (
                    <option key={id}>{venue.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="referee"
                  className="block text-sm font-medium text-gray-700"
                >
                  Játékvezető:
                </label>
                <select
                  id="referee"
                  name="referee"
                  autoComplete="referee"
                  value={referee}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e)
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz játékvezetőt--
                  </option>
                  {allUsers.map((referee, id) => (
                    <option key={id}>{referee.displayName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="assist1"
                  className="block text-sm font-medium text-gray-700"
                >
                  Asszisztens 1:
                </label>
                <select
                  id="assist1"
                  name="assist1"
                  autoComplete="assist1"
                  value={assist1}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e)
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz asszisztenst--
                  </option>
                  {allUsers.map((referee, id) => (
                    <option key={id}>{referee.displayName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="assist2"
                  className="block text-sm font-medium text-gray-700"
                >
                  Asszisztens 2:
                </label>
                <select
                  id="assist2"
                  name="assist2"
                  autoComplete="assist2"
                  value={assist2}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e)
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz asszisztenst--
                  </option>
                  {allUsers.map((assist2, id) => (
                    <option key={id}>{assist2.displayName}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col justify-center">
                <label className="block text-sm font-medium text-gray-700">
                  Dátum kiválasztása:
                </label>
                <DatePicker
                  format={format}
                  weekStartDayIndex={1}
                  minDate={new Date()}
                  value={selectedDate}
                  onChange={setSelectedDate}
                  weekDays={weekDays}
                  months={months}
                  calendarPosition={`${mainPosition}-${relativePosition}`}
                  sort
                  showOtherDays
                  render={<CustomDaysInput />}
                  ref={datePickerRef}
                  plugins={[weekends()]}
                >
                  <button
                    className="inline-flex justify-center mb-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500"
                    onClick={() => datePickerRef.current.closeCalendar()}
                  >
                    Bezárás
                  </button>
                </DatePicker>
              </div>
              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Időpont:
                </label>
                <select
                  id="time"
                  name="time"
                  autoComplete="time"
                  value={time}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  onChange={(e) => {
                    handleChange(e)
                  }}
                >
                  <option selected disabled={true} value="">
                    --Válassz időpontot--
                  </option>
                  {hoursArr.map((hour, id) => (
                    <option key={id}>{hour}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-5 md:mt-10 px-4 py-3 text-center sm:px-6">
            {edited ? (
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500"
              >
                Mentem a módosításokat
              </button>
            ) : (
              <div className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-300 hover:bg-gray-400">
                Mentem a módosításokat
              </div>
            )}
          </div>
          <div className="mb-5 md:mb-10 px-4 py-3 text-center sm:px-6">
            <button
              type="button"
              onClick={resetEditMode}
              className="inline-flex justify-center py-2 px-4 border border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700 shadow-sm text-sm font-medium rounded-md"
            >
              Mégse
            </button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default MatchDetailsEdit
