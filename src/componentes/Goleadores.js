import React from 'react'
import { connect } from 'react-redux'
import { HorizontalBar } from 'react-chartjs-2';

const Goleadores = (props) => {
    let { jugadores, equipos } = props

    jugadores.sort(function (a, b) {
        return (a.goles > b.goles) ?
            -1 :
            (a.goles < b.goles) ?
                1 : 0;
    })
    console.log(equipos)

    let goleadores = jugadores.filter((jug, i) => i < 5)

    let coloresGoleadores = [];
    goleadores.forEach(jug => {

        let eq = equipos.filter(eq => eq._id === jug.idEquipo)
        coloresGoleadores = [...coloresGoleadores, eq[0].color]
    });

    console.log(coloresGoleadores)

    const data = {
        labels: goleadores.map(jug => `${jug.nombre} ${jug.apellido}`),
        datasets: [
            {
                label: 'Goleadores',
                backgroundColor: coloresGoleadores,
                borderColor: coloresGoleadores,
                borderWidth: 1,
                hoverBackgroundColor: coloresGoleadores,
                hoverBorderColor: coloresGoleadores,
                data: goleadores.map(jug => jug.goles)
            }
        ]
    }
    const options = {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    return (
        <div>
            <HorizontalBar data={data} options={options} />
        </div>
    )
}

const mapStateToProps = (state) => ({
    jugadores: state.jugadores,
    equipos: state.equipos
})



export default connect(mapStateToProps)(Goleadores)
