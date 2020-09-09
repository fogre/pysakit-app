import React from 'react'
import styled from 'styled-components'
import { colorSelector } from '../../utils/timetableUtils'
import { SborderRadius, Sh3, Simg, Sp } from '../../ui/styledComponents'
import SearchStop from '../SearchStop'
import TransportImages from '../TransportImages'

const EditTimetable = props => {

  const modes = (!props.timetable.favorite || props.modes.includes(props.timetable.favorite))
    ? props.modes
    : [props.timetable.favorite].concat(props.modes)

  const handleChangeFavorite = mode => {
    if (props.timetable.favorite === mode) return
    props.editors.updateTimetable({ ...props.timetable, favorite: mode })
  }

  const changeName = newName => {
    return props.editors.updateTimetable(props.timetable, newName)
  }

  return(
    <Sdiv>
      <Sh3>favourite mode</Sh3>
      <Sp>favourite mode is shown first on page load</Sp>
      <TransportImages
        modes={modes}
        selectedMode={props.timetable.favorite}
        setSelectedMode={handleChangeFavorite}
        transportColor={colorSelector(props.timetable.favorite)}
      />  
      <Sdivider />
      <Sh3>change name</Sh3>
      <Sp />
      <SearchStop
        name={props.timetable.name}
        addTimetable={changeName}
      />
      <SdeleteButton onClick={()=> props.editors.removeTimetable(props.timetable.name)}>
        <Simg src='/delete.png' alt='delete' /><Sp>delete</Sp>
      </SdeleteButton>
    </Sdiv>
  )

}

const Sdiv = styled(SborderRadius)`
  height: 19.6em;
  overflow: hidden;
  text-align: center;
`
const Sdivider = styled.div`
  border-bottom: 1px solid grey;
  margin: 0 0 1em 0em;
  padding: 1em 0em 0em 0em;
`
const SdeleteButton = styled.button`
  background: white;
  border: none;
  margin-top: 1.5em;
`

export default EditTimetable