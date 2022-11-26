import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap';

const ListaJugadores = (props) => {

    let { jugadores, idEquipo, url } = props
    let jugadoresEquipo = jugadores.filter(j => j.idEquipo === idEquipo);
    console.log(jugadoresEquipo);

    let getAge = (dateString) => {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return (age)

    }

    const eliminarJugador = (evt) => {
        console.log(evt.target.id)
        let idBorrar = evt.target.id


        fetch(`${url}/eliminarJugador`, {
            method: "DELETE",
            body: JSON.stringify({ idBorrar: idBorrar }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => r.json())
            .then(jug => {
                console.log(jug);
                props.dispatch({ type: "ELIMINAR_JUGADOR", payload: jug });

            })
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Goles</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {jugadoresEquipo.map(j =>
                        <tr key={j.numero}>
                            <td>{j.numero}</td>
                            <td>{j.nombre}</td>
                            <td>{j.apellido}</td>
                            <td>{getAge(j.fecha)}</td>
                            <td>{j.goles}</td>
                            <td>
                                <a onClick={eliminarJugador} id={j._id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>

                                    eliminar
                                </a></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => ({
    jugadores: state.jugadores,
    url: state.url,
})


export default connect(mapStateToProps)(ListaJugadores)
