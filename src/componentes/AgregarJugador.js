import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-bootstrap';
import './AgregarJugador.css'

const AgregarJugador = (props) => {

    /*     const [error, setError] = useState(false) */
    let { url, idEquipo } = props

    const [show, setShow] = useState(false);



    const nombre = useRef(null);
    const apellido = useRef(null);
    const fecha = useRef(null);
    const numero = useRef(null);

    console.log(idEquipo);

    const insertarJugador = () => {

        if (nombre.current.value !== "" && apellido.current.value !== "" && fecha.current.value !== "" && numero.current.value !== "") {
            console.log(fecha);

            let jugadorNuevo = {
                nombre: nombre.current.value,
                apellido: apellido.current.value,
                fecha: fecha.current.value,
                idEquipo: idEquipo,
                numero: numero.current.value,
            }

            fetch(`${url}/insertarJugador`, {
                method: "POST",
                body: JSON.stringify(jugadorNuevo),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => r.json())
                .then(jug => {
                    console.log(jug);
                    props.dispatch({ type: "INSERTAR_JUGADOR", payload: jug });

                })

            nombre.current.value = "";
            apellido.current.value = "";
            fecha.current.value = "";
            numero.current.value = "";
        }
        else {
            setShow(true)
        }
    }



    return (


        <div className="agregarJugador">
            <h4>Agregar Jugador</h4>
            <div><div>
                <label>Número<br/>
                <input type="number" ref={numero} /></label>
                <label>Nombre<br/>
                <input type="text" ref={nombre} /></label>
                <label>Apellido<br/>
                <input type="text" ref={apellido} /></label>
                </div>
                <div>
                <label>Fecha de nacimiento<br/>
                <input type="date" ref={fecha} /></label>
                </div>
                <div style={{width:"100%",clear:"both"}}></div>
                <input type="button" value="Agregar Jugador" onClick={insertarJugador} />
            </div>


            <Toast className="error" onClose={() => setShow(false)} show={show} delay={1000} autohide>
                <Toast.Body>No puede haber campos vacíos</Toast.Body>
            </Toast>

        </div>
    )
}

const mapStateToProps = (state) => ({
    url: state.url,
})

export default connect(mapStateToProps)(AgregarJugador)
