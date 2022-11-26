import React from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, } from 'react-bootstrap';
import './Menu.css'

const Menu = (props) => {
    let { equipoUsuario } = props;
    console.log(equipoUsuario)
    return (



        <Navbar>
            <Navbar.Brand style={{ fontWeight: "bold", fontSize: "14px", color: "white" }} >
                <span style={{ fontSize: '36px', fontWeight: '400' }}> Tu<b>Liga</b></span>
            </Navbar.Brand>
            <Nav className="link-cont">
                <NavLink to="/dashboard" activeClassName="activo" >
                    <svg style={{ marginRight: '8px' }} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    Dashboard </NavLink>
                <NavLink to={{
                    pathname: '/ampliacion',
                    aboutProps: {
                        id: `${equipoUsuario}`
                    }

                }}>
                    <svg style={{ marginRight: '8px' }} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Mi equipo </NavLink>
            </Nav>

        </Navbar>


    )
}

const mapStateToProps = (state) => ({
    equipoUsuario: state.equipoUsuario,
    equipos: state.equipos
})


export default connect(mapStateToProps)(Menu)


