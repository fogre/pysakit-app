import React, { useState, useEffect } from 'react';
import { colorSelector } from '../../utils/timetableUtils'
import Schedule from './Schedule'
import TransportImages from '../TransportImages'

//Select which transportation type to show first
const selectFirstModeToShow = (timetable, modes) => {
  if (modes.includes(timetable.favorite)) return timetable.favorite
  return modes[0]
}

const ScheduleContainer = props => {
  const [visibleTimetable, setVisibleTimetable] = useState(null)
  const transportColor = colorSelector(visibleTimetable);

  useEffect(() => {
    if (props.modes && !props.modes.includes(visibleTimetable)) {
      setVisibleTimetable(
        selectFirstModeToShow(props.timetable, props.modes)
      )
    }  
  }, [props.timetable, props.modes, visibleTimetable])

  return (
    <div>
      <TransportImages
        modes={props.modes}
        selectedMode={visibleTimetable}
        setSelectedMode={setVisibleTimetable}
        transportColor={transportColor}
      />  
      <Schedule
        modes={props.modes}
        schedule={props.schedule} 
        selectedMode={visibleTimetable}
        transportColor={transportColor}
      />
    </div>  
  )
}

export default React.memo(ScheduleContainer)