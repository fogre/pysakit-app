import React, { useState, useEffect }  from 'react'
import { useQuery } from '@apollo/react-hooks'
import { STOP_TIMETABLES } from '../../graphql/queries'
import { filterByTransportModes } from '../../utils/timetableUtils'
import EditTimetable from './EditTimetable'
import ScheduleContainer from './ScheduleContainer'
import SingleTimetableHeader from './SingleTimetableHeader'

const SingleTimetable = props => {
  const [schedule, setSchedule] = useState({ scheduleByModes: null, modes: null })
  const [viewEdit, setViewEdit] = useState(false)
  const { startPolling, stopPolling } = useQuery(STOP_TIMETABLES, {
    variables: { name: props.timetable.name },
    skip: viewEdit,
    notifyOnNetworkStatusChange: true,
    onCompleted: data => { 
      if (!viewEdit) setSchedule(filterByTransportModes(data.stops))
    },
    onError: error => {
      console.log(error)
      setSchedule({ scheduleByModes: null, modes: null })
    }
  })

  useEffect(() => {
    startPolling(30000)
    return () => stopPolling()
  }, [startPolling, stopPolling])

  return (
    <div>
      <SingleTimetableHeader
        name={props.timetable.name}
        edit={viewEdit}
        setEdit={setViewEdit}
      />
      {viewEdit 
        ? <EditTimetable 
            timetable={props.timetable}
            modes={schedule.modes}
            editors={props.editors}
          />
        : <ScheduleContainer
            timetable={props.timetable}
            schedule={schedule.scheduleByModes}
            modes={schedule.modes}
          />
      }
    </div>     
  )
}

export default SingleTimetable