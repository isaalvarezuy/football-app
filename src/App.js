import React from 'react';
import './App.css';
import './bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom';
import Contenedor from './componentes/Contenedor';


import { Provider } from "react-redux";
import { store } from './store/store'


function App() {


  return (
    <Provider store={store}>
      <Router>
        <Contenedor />
      </Router>
    </Provider>
  )
}

export default App;
