import React from 'react'
import styled from 'styled-components'
import { SflexDiv } from '../ui/styledComponents'

const TransportImages = ({ modes, selectedMode, setSelectedMode, transportColor }) => {
  return (
    <SimageFlexDiv>
      {!modes || !modes.length ?
        <SimageInput
            type='image'
            src={require(`../images/ALL.png`)}
            alt={'none'}
            color='grey'
        /> :
        modes.map(transMode => 
          <SimageInput
            key={transMode}
            type='image'
            src={require(`../images/${transMode}.png`)}
            alt={transMode}
            title={transMode}
            color={transMode === selectedMode ? 
              transportColor : null }
            onClick={() => setSelectedMode(transMode)}
          />
        )
      }
    </SimageFlexDiv>
  )
}

const SimageFlexDiv = styled(SflexDiv)`
  align-items: flex-end;
`
const SimageInput = styled.input`
  border-bottom: ${props => props.color ?
   `0.3em solid ${props.color}` : 'none'};
  display: block; 
  height: 2.3em;
  margin-bottom: 1px;
  padding: 0.3em;
  padding-bottom: ${props => props.color ?
   '0.7em' : '0.4em'};
  width: 2.3em;
`
export default TransportImages