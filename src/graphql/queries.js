import gql from "graphql-tag";

export const STOP_TIMETABLES = gql`
  query stops($name: String) {
    stops(name:$name) {
      name
      stoptimesWithoutPatterns(timeRange: 2700,numberOfDepartures: 7) {
        headsign
        realtimeDeparture
        trip {
          route {
            mode
            shortName
          }
        }
      }  
    }
  }
`