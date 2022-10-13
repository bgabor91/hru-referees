import React, { useState } from 'react'
import Spinner from '../spinner'
import MatchDetails from './matchDetails'

const MatchList = (props) => {
  const {allMatches } = props
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = (id) => () =>
    setIsOpen((isOpen) => (isOpen === id ? null : id))

  return (
    <div className="mt-6 px-4 md:px-0">
      {!allMatches ? (
        <Spinner />
      ) : (
        <>
          {allMatches.map((match, id) => (
            <MatchDetails
              key={id}
              matchDetails={match}
              isOpen={isOpen === id}
              toggle={toggleOpen(id)}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default MatchList
