import React, { useState, useEffect } from 'react'
import {
  MdOutlineExpandMore,
  MdOutlineExpandLess,
  MdAccessTime,
} from 'react-icons/md'
import { mainColors } from 'src/pages/Matches/data'

const MatchDetails = (props) => {
  const { matchDetails, isOpen, toggle } = props
  const [bgColor, setBgColor] = useState()
  const isSingleMatch =
    matchDetails.type === 'NB I' || matchDetails.type === 'NB II'

  const setTitleBgColor = () => {
    if (matchDetails.type === 'NB I') {
      setBgColor(mainColors.indigo)
    } else if (matchDetails.type === 'NB II') {
      setBgColor(mainColors.orange)
    } else if (matchDetails.type === '7s') {
      setBgColor(mainColors.emerald)
    } else if (matchDetails.type === 'UP torna') {
      setBgColor(mainColors.zinc)
    }
    console.log('render')
  }

  const handleOpenMatchDetail = (e) => {
    e.preventDefault()
    toggle()
  }

  useEffect(() => {
    setTitleBgColor()
  }, [matchDetails])

  return (
    <div className="flex flex-col drop-shadow-md my-5  lg:mx-36 pb-2 bg-white text-gray-600 text-center justify-center z-0">
      <div className={`flex mx-auto px-5 text-white justify-center ${bgColor}`}>
        <h3 className="pr-1">{matchDetails.age}</h3>
        <h3 className="px-1">{matchDetails.gender}</h3>
        <h3 className="pl-1">{matchDetails.type}</h3>
      </div>
      <div className="flex pt-2 justify-around">
        <div className="my-auto w-[90px] md:w-[120px] text-md md:text-lg font-semibold">
          {matchDetails.home}
        </div>
        <div className="flex flex-col px-4">
          <div className="flex">
            <div className="my-auto mr-1">
              <MdAccessTime size={24} />
            </div>
            <div className="text-lg md:text-xl ml-1">{matchDetails.time}</div>
          </div>
          <div className="text-sm text-center">{matchDetails.date}</div>
        </div>
        <div className="my-auto w-[90px] md:w-[120px] text-md md:text-lg font-semibold">
          {matchDetails.away}
        </div>
      </div>
      <div className="flex justify-center text-sky-600 text-sm">
        {matchDetails.venue}
      </div>
      <div
        className="flex justify-center my-auto cursor-pointer"
        onClick={handleOpenMatchDetail}
      >
        {!isOpen ? (
          <MdOutlineExpandMore size={24} />
        ) : (
          <MdOutlineExpandLess size={24} />
        )}
      </div>
      {isOpen && isSingleMatch && (
        <div className="flex flex-col pt-2 justify-center text-center">
          <div className="flex flex-col text-sm">
            <p className="font-bold">Játékvezető:</p>
            <p>{matchDetails.referee}</p>
          </div>
          <div className="flex flex-col md:flex-row justify-center mx-auto md:mx-0">
            <div className="flex text-sm text-center justify-center">
              <p className="font-semibold">Asszisztens 1:</p>
              <p className="pl-1 md:px-1">{matchDetails.assist1}</p>
            </div>
            <div className="flex text-sm text-center justify-center">
              <p className="font-semibold md:pl-1">Asszisztens 2:</p>
              <p className="pl-1">{matchDetails.assist2}</p>
            </div>
          </div>
        </div>
      )}
      {isOpen && !isSingleMatch && (
        <div className="flex flex-col pt-2 justify-center text-center">
          <div className="flex flex-col text-sm">
            <p className="font-bold">Játékvezetők:</p>
          </div>
          {matchDetails.referees.map((ref) => (
            <p className="text-sm">{ref}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default MatchDetails
