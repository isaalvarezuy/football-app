import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol } from '@fortawesome/free-solid-svg-icons'
import './NoEncontrado.css'
import { Navbar } from 'react-bootstrap';



const NoEncontrado = () => {
    return (

        <div> <Navbar>
            <Navbar.Brand style={{ fontWeight: "bold", fontSize: "14px", color: "white" }} >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-graph-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z" />
                </svg>
                <span> La Liga Stats</span>
            </Navbar.Brand>
        </Navbar>
            <Container className="noEncontrado">
                <Row>
                    <Col lg={4}></Col>
                    <Col lg={4}>
                        <h2>4<FontAwesomeIcon className="bounce" icon={faFutbol} />4</h2>
                        <p>Página no encontrada</p></Col>
                    <Col lg={4}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default NoEncontrado
