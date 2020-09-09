
/*compares departure and current time (in seconds after midnight)
Returns the time in minutes if the departure is in less than 10 mins
Otherwise returns as HH:MM*/
const compareTimes = (departureTime, currentTime) => {
  let difference = departureTime - parseInt(currentTime);
  if (difference === 0)
    return '0'
  if (difference < 0 ) //after midnight
    difference += parseInt(currentTime)
  if (difference > 540) //more than 9 mins
    return new Date(departureTime * 1000).toISOString().substr(11, 5)
  return (difference/60).toFixed(0).toString()
}

/*Get current time in seconds after midnight*/
const currentTimeInSeconds = () => {
  const currentDate = new Date()
  return ((currentDate.getTime() - currentDate.setHours(0,0,0,0))/1000)
    .toFixed(0)
}

/*sorts the timetable by departure time. Checks if:
- Time is in minutes or HH:MM
- Time is before or after midnight
Otherwise compare strings*/
const timetableSorter = (timetable) => {
  timetable.sort((a,b) => {
    const time1 = a.realtimeDeparture
    const time2 = b.realtimeDeparture
    if (time1.length < time2.length)
      return -1;
    if (time1.length > time2.length)
      return 1;
    if (time1.startsWith('2') && time1.length > 1 && time2.startsWith('0'))
      return -1;
    if (time1.startsWith('0') && time1.length > 1 && time2.startsWith('2'))
      return 1;
    return time1.localeCompare(time2, undefined, { numeric: true });
  });
}

/*
- Filters the departure times by transportation mode  
- Parses the departure time with compareTimes
- Sorts the mode by departure time*/
export const filterByTransportModes = (timetable) => {
  const scheduleByModes = {}
  const timeInSeconds = currentTimeInSeconds()
  
  timetable.forEach(key => {
    key.stoptimesWithoutPatterns.forEach(dst => {
      if ( !dst.headsign || !dst.realtimeDeparture ) return
      if ( !scheduleByModes[dst.trip.route.mode] ) {
        scheduleByModes[dst.trip.route.mode] = []
      }
      const dest = {...dst}
      dest.realtimeDeparture = compareTimes(dest.realtimeDeparture, timeInSeconds)
      scheduleByModes[dest.trip.route.mode].push(dest)
      timetableSorter(scheduleByModes[dst.trip.route.mode])
    })
  })
  //If there is more than 1 transportation mode, add ALL option.
  if (Object.keys(scheduleByModes).length > 1) 
    scheduleByModes['ALL'] = []
  return { scheduleByModes, modes: Object.keys(scheduleByModes) };
}

/*If mode is ALL, then get all departures and sort by departure time
Otherwise return schedule by single mode*/
export const getDeparturesByMode = (props) => {
 // if ( !props.schedule ) return [];
  let mode = props.schedule[props.selectedMode];
  if (props.selectedMode === 'ALL') {
    mode = []
    props.modes.forEach(key => {
      if (props.schedule[key]) {
        props.schedule[key].forEach(dprt => { mode.push(dprt) }); 
      }
    });
    timetableSorter(mode);
  }
  return mode;
}  

export const colorSelector = (transtype) =>  {
  switch (transtype) {
    case 'ALL':
      return '#d85d63';
    case 'BUS':
      return '#67b3ea';
    case 'FERRY':
      return '#85d5f7';
    case 'RAIL':
      return '#9B59B6';
    case 'TRAM':
      return '#3FC380';
    case 'SUBWAY':
      return '#EB974E';
    default:
      return 'inherit';
  }
}
