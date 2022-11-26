import React from 'react'
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import './Dashboard.css'
import JerseyGenerator from './JerseyGenerator/JerseyGenerator';
import LoggedInLayout from './LoggedInLayout/LoggedInLayout';
import PositionsTable from './PositionsTable/PositionsTable';

const Dashboard = (props) => {

    let { equipoUsuario } = props

    let history = useHistory()

    if (equipoUsuario === "")
        history.push("/")

    return (
        <LoggedInLayout>
            <div className='grid grid-cols-12 gap-4'>
                <section className='col-span-8'>
                    <PositionsTable />
                </section>
            </div>
        </LoggedInLayout>)

}

const mapStateToProps = (state) => ({
    equipoUsuario: state.equipoUsuario
})
export default connect(mapStateToProps)(Dashboard)



{/* <div> */ }
/*   <Menu /> */
/*  <div > */
{/*     <JerseyGenerator /> */ }





{/*  <Col md={12} lg={5}>
                    <AgregarPartido />
                    <AgregarEquipo />
                </Col> */}

{/* 
            <PromedioGolesTodos />


            <Goleadores /> */}



/*     </div> */
/*    </div > */