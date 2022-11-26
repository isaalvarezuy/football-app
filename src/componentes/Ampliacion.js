import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Container, Col, Row, Table } from 'react-bootstrap';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import Menu from './Menu';
import AgregarJugador from './AgregarJugador'
import ListaJugadores from './ListaJugadores'
import AgregarPartido from './AgregarPartido';
import { useHistory } from "react-router-dom";

const Ampliacion = (props) => {

    let history = useHistory()
    let { equipos, jugadores, equipoUsuario } = props


    /*  const [error, setError] = useState(false)
  */

    console.log(props.location.aboutProps)

    /*  if (props.location.aboutProps === undefined) {
         setError(true);
         history.push("/") ---> aca intente hacer que si no recibe el parametro por props me tirara para atras pero se rompe todo c:
         
     } */
    let idEquipo = props.location.aboutProps.id;


    let eqAmpliar = equipos.filter(eq => eq._id === idEquipo);
    console.log(eqAmpliar);


    let ganados = eqAmpliar[0].pg;
    let empatados = eqAmpliar[0].pe;
    let perdidos = eqAmpliar[0].pp;

    console.log(eqAmpliar[0].vs)

    let nombresEquipos = [];
    eqAmpliar[0].vs.forEach(id => {
        let eq = equipos.filter(eq => eq._id === id);
        nombresEquipos = [...nombresEquipos, eq[0].nombre]
    });


    const data = {
        labels: [
            'Ganados',
            'Empatados',
            'Perdidos'
        ],
        datasets: [{
            data: [ganados, empatados, perdidos],
            backgroundColor: [
                '#00B300',
                '#767676',
                '#B53737'
            ],
            hoverBackgroundColor: [
                '#00B300',
                '#767676',
                '#B53737'
            ]
        }]
    };



    const data2 = {
        labels: nombresEquipos,
        datasets: [
            {
                label: 'Goles convertidos',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#00B300',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#00B300',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#00B300',
                pointHoverBorderColor: '#00B300',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: equipos[0].hisGF
            },
            {
                label: 'Goles recibidos',
                fill: false,
                lineTension: 0,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: '#B53737',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#B53737',
                pointBackgroundColor: '#B53737',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#B53737',
                pointHoverBorderColor: '#B53737',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: equipos[0].hisGC,
            }
        ]
    }
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }

    const data3 = {
        labels: jugadores.filter(jug => jug.idEquipo === idEquipo).map(jug => `${jug.nombre} ${jug.apellido}`),
        datasets: [
            {
                label: 'Goles de cada jugador',
                backgroundColor: eqAmpliar[0].color,
                borderColor: eqAmpliar[0].color,
                borderWidth: 1,
                hoverBackgroundColor: eqAmpliar[0].color,
                hoverBorderColor: eqAmpliar[0].color,
                data: jugadores.filter(jug => jug.idEquipo === idEquipo).map(jug => jug.goles)
            }
        ]
    }




    return (

        <div>
            <Menu></Menu>
            <Container style={{ paddingTop: "20px" }}>
                <Row>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
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
                            </tr>
                        </thead>
                        <tbody>
                            {eqAmpliar.map((eq, i) =>
                                <tr key={eq._id}>
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
                                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check-circle-fill" fill="#00B300" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                        </svg> :
                                                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-dash-circle-fill" fill="#767676" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                                                        </svg>

                                            }</span>)
                                        }
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>

                </Row>
                <Row>
                    <Col lg={6}><Doughnut data={data} />
                        <Line data={data2} options={options} />
                        <Bar data={data3} options={options} />
                    </Col>
                    <Col lg={6}>
                        <AgregarPartido />
                        <AgregarJugador idEquipo={idEquipo} />
                        <ListaJugadores idEquipo={idEquipo} />

                    </Col>


                </Row>
            </Container>
        </div>
    )
}
const mapStateToProps = (state) => ({
    equipos: state.equipos,
    jugadores: state.jugadores,
    url: state.equipoUsuario,
})


export default connect(mapStateToProps)(Ampliacion)

