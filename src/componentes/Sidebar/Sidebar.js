import React from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, } from 'react-bootstrap';
import { Squares2X2Icon, StarIcon } from '@heroicons/react/24/solid'


const Sidebar = (props) => {
    let { equipoUsuario } = props;
    console.log(equipoUsuario)
    return (

        <navbar className="fixed w-[300px] bg-gray-900 h-full p-8 gap-10">
            <p className='text-gray-50 text-4xl'>Tu<span className='font-medium'>Liga</span></p>
            <div>
                <NavLink to="/dashboard"
                    className=' rounded-md flex items-center text-base gap-2 text-gray-50 p-3 hover:text-gray-50 hover:no-underline hover:bg-gray-800 transition-all'
                    activeClassName="bg-gray-800">
                    <Squares2X2Icon className="h-4 w-4" />
                    Dashboard
                </NavLink>
                <NavLink to={{
                    pathname: '/ampliacion',
                    aboutProps: {
                        id: `${equipoUsuario}`
                    }
                }}
                    className=' rounded-md flex items-center text-base gap-2 text-gray-50 p-3 hover:text-gray-50 hover:no-underline hover:bg-gray-800 transition-all'
                    activeClassName="bg-gray-800" >
                    <StarIcon className="h-4 w-4" />
                    Mi equipo
                </NavLink>
            </div>

        </navbar >
    )
}

const mapStateToProps = (state) => ({
    equipoUsuario: state.equipoUsuario,
    equipos: state.equipos
})


export default connect(mapStateToProps)(Sidebar)


