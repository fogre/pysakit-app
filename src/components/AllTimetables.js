import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StextCenterDiv, SflexDiv } from '../ui/styledComponents'
import SingleTimetable from './SingleTimetableComponents/SingleTimetable'
import SearchStop from './SearchStop'

const AllTimetables = () => {

  const [timetables, setTimetables] = useState(
    localStorage.getItem('pysakitApp-storage')
      ? JSON.parse(localStorage.getItem('pysakitApp-storage'))
      : []
  )

  useEffect(() => {
    localStorage.setItem('pysakitApp-storage', JSON.stringify(timetables))
  }, [timetables])

  const addTimetable = name => {
    if (timetables.find(t => t.name === name))
      return false

    setTimetables(timetables.concat({
      name: name,
      favorite: null
    }))
    return true
  }

  const removeTimetable = name => {
    setTimetables(timetables.filter(t => 
      t.name !== name 
    ))
  }

  const updateTimetable = (timetable, newName = null) => {
    if (newName && timetables.find(t => t.name === newName))
      return false

    const index = timetables.findIndex(t => t.name === timetable.name)
    const newTimetables = [].concat(timetables)
    newTimetables[index] = newName
      ? { ...timetable, name: newName }
      : { ...timetable }
    setTimetables(newTimetables)
    return true
  }

  return (
    <div>
      {!timetables.length
        ? <SemptyDiv /> 
        :  <SflexDiv>
            {timetables.map(timetable =>
              <SsingleContainer key={timetable.name}>
                <SingleTimetable
                  timetable={timetable}
                  editors={{ removeTimetable, updateTimetable }}
                />
              </SsingleContainer>
            )}
          </SflexDiv>
      }    
      <SsearchContainer>
        <h3 className='h3'>search timetable</h3>
        <SearchStop addTimetable={addTimetable} />
      </SsearchContainer>
    </div>  
  )

}

const SsingleContainer = styled.div`
  max-width: 95vw;
  position: relative;
  width: 24em;
  margin-bottom: 2em;
`
const SemptyDiv = styled.div`
  height: 20vh;
`
const SsearchContainer = styled(StextCenterDiv)`
  h3 {
    font-size: 1.8em;
    font-weight: 500;
    margin-bottom: 0.5em;
  }
`

export default AllTimetables