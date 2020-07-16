import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalProject from './Components/ModalProject'
import Students from './Components/Students';


function App () {
    return (
      <>
        <Students />
        <ModalProject />
      </>
    )
 
}

export default App;
