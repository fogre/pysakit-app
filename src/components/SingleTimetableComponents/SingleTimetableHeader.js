import React from 'react'
import styled from 'styled-components'
import { Simg } from '../../ui/styledComponents'

const SingleTimetableHeader = ({ name, edit, setEdit }) => {
  return(
    <Sflex id={name}>
      <h2>{name}</h2>
      <SeditButton onClick={() => setEdit(!edit)}>
        {edit
          ? <Simg src='/close.png' alt='close' />
          : <Simg src='/edit.png' alt='edit' />
        }
      </SeditButton>
    </Sflex>
  )
}

const Sflex = styled.div`
  display: flex;
  margin-bottom: 1em;
`

const SeditButton = styled.button`
  background-color: transparent;
  border: none;
  margin-left: auto;
  padding: 0.1em 0.1 0 0.3em;
`
export default SingleTimetableHeader