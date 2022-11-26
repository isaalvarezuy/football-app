import React from 'react'
import Menu from '../Menu'
import Tabla from '../Tabla'
import Outlet from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'

const LoggedInLayout = ({ children }) => {
    return (
        <div  >
            <Sidebar />
            <div className='w-full bg-blue-50 ml-[300px] p-8 min-h-screen'>
                {children}
            </div>


        </div >
    )
}

export default LoggedInLayout