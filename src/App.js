import React from 'react';
import styled from 'styled-components'
import AllTimetables from './components/AllTimetables'
import Footer from './components/Footer'

const App = () => {

  return (
    <Sdiv>
      <Sheader>
        <SlogoImg src='./pysakit-app-logo.png' alt='logo' />
      </Sheader>  
      <AllTimetables />
      <Footer />
    </Sdiv>
  );
}

const Sdiv = styled.div`
  margin: auto;
  max-width: 900px;
  padding: 5px;
`
const Sheader = styled.div`
 text-align: center; 
 margin: 0.1em 0 5em 0;
 padding: 0;
`
const SlogoImg = styled.img`
  width: 100px;
`

export default App;
