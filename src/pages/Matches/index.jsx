import React, { useState, useEffect } from 'react'
import { UserAuth } from 'src/contexts/AuthContext'
import { MatchCollection } from 'src/contexts/MatchContext'
import MatchList from './components/matchList'
import MatchDetailsEdit from './components/matchDetailsEdit'

const ADMIN = 'admin'

const Matches = () => {
  const { userData } = UserAuth()
  const { getAllMatches } = MatchCollection()
  const [editMode, setEditMode] = useState(false)
  const [allMatches, setAllMatches] = useState([])
  const [reload, setReload] = useState(false)
  const isAdmin = userData?.role === ADMIN

  const fetchAllMatches = async () => {
    const response = await getAllMatches()
    setAllMatches(response)
  }

  const handleEditMode = (e) => {
    e.preventDefault()
    setEditMode(true)
  }

  const resetEditMode = () => {
    setEditMode(false)
  }

  useEffect(() => {
    fetchAllMatches()
  }, [reload])

  return (
    <div className="mt-5 md:mt-10 text-center px-4 md:px-0 text-gray-600">
      <h1 className="text-2xl font-bold mb-2 md:mb-4">Mérkőzések</h1>
      {isAdmin && !editMode && (
        <div className="mt-4 px-4 py-3 text-center sm:px-6">
          <button
            type="button"
            onClick={handleEditMode}
            className="inline-flex justify-center mb-2 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-500"
          >
            + Új esemény létrehozása
          </button>
        </div>
      )}
      {editMode ? (
        <MatchDetailsEdit
          isAdmin={isAdmin}
          resetEditMode={resetEditMode}
          allMatches={allMatches}
          setReload={setReload}
        />
      ) : (
        <MatchList isAdmin={isAdmin} allMatches={allMatches} />
      )}
    </div>
  )
}

export default Matches
