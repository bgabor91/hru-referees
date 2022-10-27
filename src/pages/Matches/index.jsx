import React, { useState, useEffect } from 'react'
import { UserAuth } from 'src/contexts/AuthContext'
import MatchList from './components/matchList'
import MatchDetailsEdit from './components/matchDetailsEdit'
import useAllMatches from './hooks/useAllMatches'
import PrimaryButton from 'src/components/common/primaryButton'

const ADMIN = 'admin'

const Matches = () => {
  const { userData } = UserAuth()
  const { allMatches, fetchAllMatches } = useAllMatches()
  const [editMode, setEditMode] = useState(false)
  const [reload, setReload] = useState(false)
  const isAdmin = userData?.role === ADMIN

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
          <PrimaryButton
            type={'button'}
            onClick={handleEditMode}
            text={'+ Új esemény létrehozása'}
          />
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
