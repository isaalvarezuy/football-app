import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import './AgregarPartido.css'
import { Col, Row, Toast } from 'react-bootstrap';

const AgregarPartido = (props) => {
    let { equipos, url, jugadores } = props;

    const [error, setError] = useState(false)

    let aux1 = [];
    const [cantGoles1, setCantGoles1] = useState([])

    let aux2 = [];
    const [cantGoles2, setCantGoles2] = useState([])

    const dibujarCompEq1 = () => {

        let golEq1 = parseInt(r1.current.value);
        console.log(golEq1)
        aux1 = [];
        for (let i = 0; i < golEq1; i++) {
            aux1.push(i)
        }
        console.log(aux1)
        setCantGoles1(aux1)
    }

    const dibujarCompEq2 = () => {

        let golEq2 = parseInt(r2.current.value);
        console.log(golEq2)
        aux2 = [];
        for (let i = 0; i < golEq2; i++) {
            aux2.push(i)
        }
        console.log(aux2)
        setCantGoles2(aux2)
    }


    equipos.sort(function (a, b) {
        var textA = a.nombre;
        var textB = b.nombre;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    /*  console.log(jugadores) */

    const [idE1, setIdE1] = useState(null)
    const [idE2, setIdE2] = useState(null)

    const e1 = useRef(null);
    const r1 = useRef(null);
    const e2 = useRef(null);
    const r2 = useRef(null);

    const ingresarPartido = () => {

        if (r1.current.value !== "" && r2.current.value !== "" && e1.current.value !== e2.current.value) {
            setError(false);
            let eq1 = e1.current.value; //id eq 1
            let rEq1 = parseInt(r1.current.value);

            let eq2 = e2.current.value; //id eq 2
            let rEq2 = parseInt(r2.current.value);

            let equipo1 = equipos.filter(eq => eq._id === eq1);
            console.log(equipo1);
            let equipo2 = equipos.filter(eq => eq._id === eq2);
            console.log(equipo2);
            console.log(equipo1);
            console.log(equipo1[0]);
            console.log(equipo1[0].hisGF);
            console.log(equipo1[0].historico);

            let selGoles1 = document.querySelectorAll("select.goles1");
            console.log(selGoles1);

            let selGoles2 = document.querySelectorAll("select.goles2");
            console.log(selGoles2);



            let datosPartido = { e1: eq1, r1: rEq1, e2: eq2, r2: rEq2, his1: equipo1[0].historico, his2: equipo2[0].historico, gf1: equipo1[0].hisGF, gf2: equipo2[0].hisGF, gc1: equipo1[0].hisGC, gc2: equipo2[0].hisGC, vs1: equipo1[0].vs, vs2: equipo2[0].vs }

            fetch(`${url}/agregarPartido`, {
                method: "PUT",
                body: JSON.stringify(datosPartido),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(r => r.json())
                .then(equipos => {
                    console.log(equipos);
                    props.dispatch({ type: "INSERTAR_PUNTOS", payload: equipos });
                    selGoles1.forEach(n =>
                        fetch(`${url}/agregarGol`, {
                            method: "PUT",
                            body: JSON.stringify({ id: n.value }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(r => r.json())
                            .then(jugador => {
                                console.log(jugador);
                            })
                    )
                    selGoles2.forEach(n =>
                        fetch(`${url}/agregarGol`, {
                            method: "PUT",
                            body: JSON.stringify({ id: n.value }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(r => r.json())
                            .then(jugador => {
                                console.log(jugador);
                                props.dispatch({ type: "ACTUALIZAR_JUGADORES", payload: jugadores })
                                fetch(`${url}/listarJugadores`, {
                                    method: "GET",
                                }).then(r => r.json())
                                    .then(jugadores => {
                                        /*       console.log(jugadores); */
                                        props.dispatch({ type: "ACTUALIZAR_JUGADORES", payload: jugadores })

                                    })
                            })
                    )


                })
        } else {
            setError(true);

        }


    }

    return (
        <div className="agregarPartido">
            <Row>
                <Col md={12}>
                    <h4>Agregar partido</h4>
                </Col>
            </Row>
            <Row className="agregarGral">

                <Col md={12}>
                    <select ref={e1} onChange={() => {
                        if (e1 !== null)
                            setIdE1(e1.current.value)
                    }}>
                        {equipos.map(eq => <option key={eq._id} value={eq._id}>{eq.nombre}</option>)}
                    </select>
                    <input type="number" ref={r1} onChange={(dibujarCompEq1)} />

                    <span >vs</span>

                    <select ref={e2} onChange={() => {
                        if (e2 !== null)
                            setIdE2(e2.current.value)
                    }}>
                        {equipos.map(eq => <option key={eq._id} value={eq._id}>{eq.nombre}</option>)}
                    </select>
                    <input type="number" ref={r2} onChange={(dibujarCompEq2)} /><br />
                </Col>
                <hr />
                <Col md={6}>
                    <div className="golesEq">

                        {cantGoles1.map((c, i) => <label key={i}> Gol {i + 1}:<br /><select className="goles1">
                            {jugadores.filter(jug => jug.idEquipo === e1.current.value).map(j => <option key={j._id} value={j._id}>{j.nombre} {j.apellido}</option>)}
                        </select></label>)}

                    </div>
                </Col>
                <Col md={6}>
                    <div className="golesEq">
                        {cantGoles2.map((c, i) => <label key={i}> Gol {i + 1}:<br /><select className="goles2">
                            {jugadores.filter(jug => jug.idEquipo === e2.current.value).map(j => <option key={j._id} value={j._id}>{j.nombre} {j.apellido}</option>)}
                        </select><br /></label>)}
                    </div>
                </Col>

                <Col md={6}>
                    <input type="button" value="Ingresar" onClick={ingresarPartido} />
                </Col>
                <Col lg={12}>

                    <Toast className="error" onClose={() => setError(false)} show={error} delay={1000} autohide>
                        <Toast.Body>Los campos de resultado no pueden estar vacíos, y deben ser dos equipos diferentes</Toast.Body>
                    </Toast>
                </Col>
            </Row>


        </div>
    )
}

const mapStateToProps = (state) => ({
    equipos: state.equipos,
    url: state.url,
    jugadores: state.jugadores,
})

export default connect(mapStateToProps)(AgregarPartido)
