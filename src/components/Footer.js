import React from 'react'
import styled from 'styled-components'
import { StextCenterDiv, Sdivider, Sp } from '../ui/styledComponents'

const Footer = () => {
  return (
    <StextCenterDiv>
      <Sdivider />
      <SlogoImg src='pysakit-app-logo-wide.png' alt='pysakit-logo-wide' />
      <Sp>A HSL-region stop timetable searcher.</Sp>
      <br />
      <p>
        All transportation data originates from <Sa href='https://digitransit.fi/'>
           Digitransit API</Sa><br/>(CC BY 4.0)
      </p>
      <p>     
        Transportation icons are courtesy of <Sa href='https://www.hsl.fi/en/helsinki-regional-transport-authority'>
            HSL.fi</Sa>  
      </p>
      <br/>
      <p>Site by fogre. No rights reserved.</p>
    </StextCenterDiv>
  )
}

const Sa = styled.a.attrs(() => ({
  target: '_blank',
  rel:'noopener noreferrer'
}))`
  font-weight: 500;
  color: #012647;
`
const SlogoImg = styled.img`
  width: 130px;
`
export default Footer