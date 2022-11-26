import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Registro from './Registro'
import Login from './Login';
import Dashboard from './Dashboard';
import Ampliacion from './Ampliacion';
import AgregarEquipo from './AgregarEquipo';
import NoEncontrado from './NoEncontrado'



const Contenedor = (props) => {

  let { url } = props;

  useEffect(() => {
    fetch(`${url}/listarEquipos`, {
      method: "GET",
    }).then(r => r.json())
      .then(equipo => {
        console.log(equipo);
        props.dispatch({ type: "ACTUALIZAR_EQUIPOS", payload: equipo })

        fetch(`${url}/listarJugadores`, {
          method: "GET",
        }).then(r => r.json())
          .then(jugadores => {
            console.log(jugadores);
            props.dispatch({ type: "ACTUALIZAR_JUGADORES", payload: jugadores })

          })

      })



  })
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/registro" component={Registro} />
          <Route exact path="/ampliacion" component={Ampliacion} />
          <Route exact path="/agregarequipo" component={AgregarEquipo} />
          <Route component={NoEncontrado} />
        </Switch>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => ({
  url: state.url,
  equiposUsuario: state.equiposUsuario,
})


export default connect(mapStateToProps)(Contenedor)
