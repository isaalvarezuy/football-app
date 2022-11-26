import React, { useRef, useState } from 'react'
import { connect } from 'react-redux';
import './AgregarEquipo.css';
import {  Toast } from 'react-bootstrap';

const AgregarEquipo = (props) => {
    let { url } = props;

    const [error, setError] = useState(false)

    const nombreEquipo = useRef(null)
    const color = useRef(null)

    const agregarEquipo = () => {

        if (nombreEquipo.current.value !== "" && color.current.value !== "") {
            setError(false)
            let equipoNuevo = {
                nombre: nombreEquipo.current.value,
                color: color.current.value
            };

            console.log(equipoNuevo)


            fetch(`${url}/insertarEquipo`, {
                method: "POST",
                body: JSON.stringify(equipoNuevo),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => r.json())
                .then(equipo => {
                    console.log(equipo);
                    props.dispatch({ type: "INSERTAR_EQUIPOS", payload: equipo });
                })
        } else {
            setError(true);
        }
    }


    return (
        <div className="agregarEquipo">
            <h4>Agregar Equipo</h4>
            <div>
                <label>Nombre del equipo<br></br>
                    <input type="text" ref={nombreEquipo} placeholder="Nombre del equipo" /><br />
                </label>
                <label> Color del equipo
                    <div id="colorcito">
                        <input type="color" ref={color}></input>
                    </div>
                </label>
                <div style={{ width: "100%", clear: "both" }}></div>
                <input type="button" value="Agregar Equipo" onClick={agregarEquipo} />
            </div>
            <Toast className="error" onClose={() => setError(false)} show={error} delay={1000} autohide>
                <Toast.Body>No puede haber campos vacíos</Toast.Body>
            </Toast>

        </div>
    )
}

const mapStateToProps = (state) => ({
    url: state.url,
})


export default connect(mapStateToProps)(AgregarEquipo)


