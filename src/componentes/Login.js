import React, { useRef, useState } from 'react'
import { connect } from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";
import { Form, Container, Button, Col, Row, Toast, Navbar } from 'react-bootstrap';

const Login = (props) => {

    let { url } = props

    let history = useHistory();

    const [error, setError] = useState(null)
    const user = useRef(null);
    const pass = useRef(null);

    const ingresar = () => {
        console.log(user.current.value);
        console.log(pass.current.value);

        console.log(url);
        let usuario = {
            user: user.current.value,
            pass: pass.current.value
        }

        fetch(`${url}/ingresar`, {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(r => r.json())
            .then(usuario => {
                console.log(usuario);

                if (usuario === null) {
                    setError(true)
                } else {
                    console.log(usuario.equipo)
                    props.dispatch({ type: "TRAER_EQUIPO", payload: usuario.equipo })
                    history.push("/dashboard")
                }

            })
    }

    return (

        <div> <Navbar>
            <Navbar.Brand style={{ fontWeight: "bold", fontSize: "14px", color: "white" }} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-graph-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z" />
                </svg>
                <span> La Liga Stats</span>
            </Navbar.Brand>
        </Navbar>
            <Container style={{ paddingTop: "15vh" }}>

                <Row>
                    <Col lg={4}></Col>

                    <Col>
                        <h2 style={{fontWeight:"bold",fontSize:"18px"}}>Bienvenid@ a La Liga Stats!</h2>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control type="text" placeholder="usuario" ref={user} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Contraseña" ref={pass} />
                            </Form.Group>

                            <Button style={{backgroundColor:"#0E4F81"}} onClick={ingresar}>
                                Ingresar
  </Button>

                            <Form.Text className="text-muted" style={{fontSize:"14px"}}>
                                ¿No tienes cuenta? <NavLink style={{color:"grey",textDecoration:"underline"}} to="/registro">Regístrate</NavLink>
                            </Form.Text>


                        </Form>

                        <Toast className="error" onClose={() => setError(false)} show={error} delay={1000} autohide>
                            <Toast.Body>Usuario y/o contraseña incorrecto</Toast.Body>
                        </Toast>
                    </Col>

                    {/*  <input type="text"  />
                    <input type="text"  />
                    <input type="button"  value="Ingresar" />
                   */}


                    <Col lg={4}></Col>
                </Row>

            </Container>
        </div>

    )
}

const mapStateToProps = (state) => ({
    url: state.url
})


export default connect(mapStateToProps)(Login)
