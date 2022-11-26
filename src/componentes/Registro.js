import React, { useRef, useState } from 'react'
import { connect } from 'react-redux';
import { Form, Container, Button, Col, Row, Toast, Navbar } from 'react-bootstrap';
import { useHistory } from "react-router-dom";


const Registro = (props) => {
    let { equipos, url } = props;
    let history = useHistory();

    const [error, setError] = useState(false);
    const [usado, setUsado] = useState(false);

    const user = useRef("")
    const pass = useRef("")
    const equipo = useRef("")

    let agregarUsuario = () => {
        console.log(user.current.value)
        console.log(pass.current.value)
        console.log(equipo.current.value)
        if (user.current.value === "" || pass.current.value === "" || equipo.current.value === "0") {
            setError(true)
        }
        else {
            let userNuevo = {
                user: user.current.value,
                pass: pass.current.value,
                equipo: equipo.current.value
            };

            fetch(`${url}/insertar`, {
                method: "POST",
                body: JSON.stringify(userNuevo),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => r.json())
                .then(resp => {
                    console.log(resp);
                    if (resp === "error") {
                        setUsado(true)
                    } else {
                        props.dispatch({ type: "TRAER_EQUIPO", payload: resp.equipo });
                        history.push("/dashboard")
                    }

                })
        }
    }

    return (

        <div>

            <Navbar>
                <Navbar.Brand style={{ fontWeight: "bold", fontSize: "14px", color: "white" }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-graph-up" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z" />
                    </svg>
                    <span> La Liga Stats</span>
                </Navbar.Brand>
            </Navbar>

            <Container style={{ paddingTop: "40px" }}>
                <Row>
                    <Col lg={4}></Col>

                    <Col>
                        <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>Registrate!</h2>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control type="text" placeholder="usuario" ref={user} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Contraseña" ref={pass} />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Equipo Favorito</Form.Label>
                                <Form.Control as="select" defaultValue="0" ref={equipo}>
                                    <option disabled value="0" >Elija su equipo favorito</option>
                                    {equipos.map(eq =>
                                        <option key={eq._id} value={eq._id}>{eq.nombre}</option>)}
                                </Form.Control>
                            </Form.Group>
                            <Button style={{ backgroundColor: "#0E4F81" }} onClick={agregarUsuario}>
                                Registrarme </Button>

                            <Toast className="error" onClose={() => setError(false)} show={error} delay={1000} autohide>
                                <Toast.Body>No puede haber campos vacíos</Toast.Body>
                            </Toast>
                            <Toast className="error" onClose={() => setUsado(false)} show={usado} delay={1000} autohide>
                                <Toast.Body>Nombre de usuario no disponible. Intente con otro!</Toast.Body>
                            </Toast>





                        </Form>
                    </Col>




                    <Col lg={4}></Col>
                </Row>

            </Container>

        </div>
    )
}

const mapStateToProps = (state) => ({
    equipos: state.equipos,
    url: state.url,
})


export default connect(mapStateToProps)(Registro)
