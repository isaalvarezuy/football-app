import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Table, Toast } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'


const Tabla = (props) => {

    let { equipos, url } = props;

    const comparar = (a, b) => {
        return ((b.pg) * 3 + b.pe) - ((a.pg) * 3 + a.pe)
    }
    equipos.sort(comparar);
    const [error, setError] = useState(false)

    const eliminarEquipo = (evt) => {
        console.log(equipos.filter(eq => eq._id === evt.target.id));
        let equipoBorrar = equipos.filter(eq => eq._id === evt.target.id);
        if (equipoBorrar[0].vs.length > 0) {
            setError(true)
            /* console.log("no se puede borrar") */
        } else {
            fetch(`${url}/eliminarEquipo`, {
                method: "DELETE",
                body: JSON.stringify({ idBorrar: equipoBorrar[0]._id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => r.json())
                .then(equipo => {
                    console.log(equipo);
                    props.dispatch({ type: "ELIMINAR_EQUIPO", payload: equipo });

                })
            /*  console.log("se puede borrar") */

        }
    }
    return (

        <div id="tabla">


            <table >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Equipo</th>
                        <th>PJ</th>
                        <th>G</th>
                        <th>P</th>
                        <th>E</th>
                        <th>GF</th>
                        <th>GC</th>
                        <th>DG</th>
                        <th>Pts.</th>
                        <th>Ultimos 5</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {equipos.map((eq, i) =>
                        <tr key={eq._id}>
                            <td style={{ fontWeight: "bold" }}>{i + 1}</td>
                            <td style={{ textAlign: "left" }}>
                                <div style={{ width: "10px", height: "10px", backgroundColor: `${eq.color}`, display: "inline-block", margin: "0 5px", borderRadius: "5px" }}></div>
                                {eq.nombre}</td>
                            <td>{eq.pj}</td>
                            <td>{eq.pg}</td>
                            <td>{eq.pp}</td>
                            <td>{eq.pe}</td>
                            <td>{eq.gf}</td>
                            <td>{eq.gc}</td>
                            <td>{eq.gf - eq.gc}</td>
                            <td>{(eq.pg * 3) + (eq.pe)}</td>
                            <td>
                                {
                                    eq.historico.filter((r, i) => i > eq.historico.length - 6).map((r, i) => <span key={`${eq._id}${i}`}>{

                                        (r === "p") ?
                                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x-circle-fill" fill="#B53737" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                            </svg> :
                                            (r === "g") ?
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#34D399">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg> :
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-dash-circle-fill" fill="#767676" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                                                </svg>

                                    }</span>)
                                }
                            </td>
                            <td>
                                <NavLink to={{
                                    pathname: '/ampliacion',
                                    aboutProps: {
                                        id: `${eq._id}`
                                    }
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                    </svg> </NavLink><br />
                                <div id={eq._id} onClick={eliminarEquipo}>

                                    <svg id={eq._id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path id={eq._id} d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path id={eq._id} fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>

                                </div>

                            </td>
                        </tr>)}
                </tbody>
            </table>
            <Toast className="error" onClose={() => setError(false)} show={error} delay={1000} autohide>
                <Toast.Body>No se puede eliminar un equipo que tiene partidos ingresados</Toast.Body>
            </Toast>
        </div >
    )
}
const mapStateToProps = (state) => ({
    equipos: state.equipos,
    url: state.url
})
export default connect(mapStateToProps)(Tabla)
