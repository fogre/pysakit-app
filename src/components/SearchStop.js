import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import { STOP_TIMETABLES } from '../graphql/queries'

const SearchStop = props => {
  const [stopName, setStopName] = useState(props.name ? props.name : '')
  const [showError, setShowError] = useState(null)
  const [nameChanged, setNameChanged] = useState(false)
  const [searchStop] = useLazyQuery(STOP_TIMETABLES, {
    onCompleted: data => handleCompleted(data),
    onError: error => setShowError('Something went wrong...')
  })
  const disabled = (nameChanged && stopName.length > 3) ? false : true

  const focusThis = (id) => {
    if (!props.name && window.innerWidth < 900)
      document.getElementById(id).scrollIntoView()
  }
  
  const handleChange = e => {
    if (!nameChanged) setNameChanged(true)
  	setStopName(e.target.value)
  }

  const handleCompleted = data => {
    if (!data.stops.length) {
      setShowError(`no stops found with name ${stopName}`)
      return
    }
    if (props.addTimetable(stopName)) {
      document.getElementById('searchInput').blur();
      setShowError(null)
      setStopName('')
      setTimeout(() => {
        if (document.getElementById(stopName))
          focusThis(stopName)
      }, 100)
    } else {
      setShowError(`${stopName} already exists`)
    }
  }

  const handleSearchStop = e => {
  	e.preventDefault()
    setNameChanged(false)
    searchStop({ variables: { name: stopName } })
  }

  return(
    <div>
      {showError 
        ? <SerrorMessage>{showError}</SerrorMessage>
        : null
      }
      <SsearchContainer>  
        <SsearchForm autoComplete='off' autocomplete='off' onSubmit={handleSearchStop}>
          <SformInput
            id='searchInput'
            inputMode='search'
            onFocus={() => focusThis('searchInput')}
            onChange={handleChange}
            placeholder='Enter stop name, ie. "rautatien"'
            type='search'
            value={stopName}
          />
          <SsubmitButton type='submit' disabled={disabled}>
            <SsearchIcon 
              src='/search.svg'
              alt='search'
              disabled={disabled}
            />
          </SsubmitButton>
        </SsearchForm>
      </SsearchContainer> 
    </div>   
  )
}

const SsearchContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`
const SerrorMessage = styled.p`
  margin: 0.3em;
`
const SsearchForm = styled.form`
  align-items: center; 
  border-radius: 1.2em;
  border: 1px solid #5ab3ff;
  box-shadow: 0px 0px 5px 1px rgba(50,50,50,0.2);
  display: flex;
  height: 3em;
  max-width: 85%;
  padding-left: 1.3em;
  scroll-behavior: smooth;
  width: 430px;

  :hover, :focus-within {
    box-shadow: 0px 0px 5px 1px rgba(50,50,50,0.4);
  }
`
const SformInput = styled.input`
  border: none;
  margin: 0.5em;
  width: 80%
`
const SsubmitButton = styled.button`
  background: transparent;
  border: none;
  margin-left: auto;
  padding: 0.3em;
  padding-right: 3.5em;
  width: 3em;
`
const SsearchIcon = styled.img`
  margin-top: 0.3em;
  opacity: ${props => props.disabled ? 0.5 : 1};
  height: 1.5em;
  width: 1.5em;
`

export default SearchStop;