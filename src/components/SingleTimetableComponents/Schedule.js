import React from 'react'
import styled from 'styled-components'
import { SborderRadius } from '../../ui/styledComponents'
import { getDeparturesByMode } from '../../utils/timetableUtils'

const Timetable = ({ props }) => {
  const mode = getDeparturesByMode(props)

  return (
    <div>
      {mode.map((departure, index) =>
        <SDGrid key={index}>
          <SDcolumn1>
            {departure.realtimeDeparture}
            {departure.realtimeDeparture.length === 1
              ? <span className='small'> min</span>
              : null 
            }
          </SDcolumn1>
          <SDcolumn2>
            <img 
              src={require('../../images/'+departure.trip.route.mode+'.png')}
              className='transportImage'
              alt=''
            /> {departure.trip.route.shortName}
          </SDcolumn2>  
          <SDcolumn3>{departure.headsign}</SDcolumn3>
        </SDGrid>
      )}
    </div>
  )
}

const EmptyText = ({ schedule }) => {
  const text = schedule === null
    ? 'loading...' 
    : 'No departures in the next 2 hours.'
  return(
    <SDGrid>
      <SDcolumn3 className='empty'>{text}</SDcolumn3>
    </SDGrid>
  )
}

const Schedule = props => {
  const contentToShow = !props.schedule || !props.schedule[props.selectedMode]
    ? <EmptyText schedule={props.schedule} />
    : <Timetable props={props} />

  return(
    <Sborder color={props.transportColor}>
      <SDtimetable>
        <SDGrid className='headers'>
          <SDcolumn1>In</SDcolumn1>
          <SDcolumn2>Route</SDcolumn2>
          <SDcolumn3>Destination</SDcolumn3>
        </SDGrid>
        <div className='entries'>
          {contentToShow}
        </div> 
      </SDtimetable>
    </Sborder>  
  )
}

const Sborder = styled(SborderRadius)`
  border-right: 2.2px solid ${props => props.color};
  border-top: 1px solid ${props => props.color};
`
const SDtimetable = styled.div`
  height: 16.5em;
  padding: 0;
  margin: 0;

  .entries {
    height: 13.5em;
    overflow-y: scroll;
  }
`
const SDGrid = styled.div`
  display: grid;
  border-bottom: 1px dotted grey;
  grid-template-columns: repeat(3, 3.9em);
  height: 2.5em;
  line-height: 0.6em;
  overflow: hidden;
  padding-left: 2em; 
  white-space: nowrap;

  .transportImage {
    padding-left: 0.5em;
    heigth: 0.5em;
    width: 0.5em;
  }

  &.headers {
    color: grey;
    border-bottom: 1px solid grey;
    line-height: 1.9em;
    padding-bottom: 0.6em;
  }
`
const SDcolumn1 = styled.p`
  font-size: 0.95em;
  font-weight: 500;
  grid-column: 1;
  grid-column-start: 1;
  justify-self: center;
  
  .headers & {
    justify-self: start;
    font-size: 1em;
    font-weight: 300;
    padding-left: 1.5em;
  }

  .small {
    font-weight:300;
    font-size: 0.8em;
  }
` 
const SDcolumn2 = styled.p`
  font-size: 0.95em;
  font-weight: 500;
  grid-column: 2;
  grid-column-start: 2
  justify-self: center;
  overflow: hidden;
  .headers & {
    font-size: 1em;
    font-weight: 300;
  }
`
const SDcolumn3 = styled.p`
  grid-column: 3;
  grid-column-start: 3;

  &.empty {
    justify-self: center;
    font-size: 0.95
  }
`
export default Schedule