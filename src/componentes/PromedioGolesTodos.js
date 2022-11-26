import React from 'react'
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';

const PromedioGolesTodos = (props) => {
  let { equipos } = props;
  /*   console.log(equipos); */
  /*  console.log(equiposNombre) */
  let equiposPromedio = [...equipos.map(eq => eq.gf / eq.pj)];

  const data = {
    labels: equipos.map(eq => eq.nombre),
    datasets: [
      {
        label: "Goles por Partido",
        backgroundColor: equipos.map(eq =>eq.color),
        borderColor: equipos.map(eq =>eq.color),
        borderWidth: 1,
        hoverBackgroundColor: equipos.map(eq =>eq.color),
        hoverBorderColor: equipos.map(eq =>eq.color),
        data: equiposPromedio
      }


    ]
  };
  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }

  return (
    <div>

      <Bar data={data} options={options} />

    </div>
  )
}

const mapStateToProps = (state) => ({
  equipos: state.equipos
})


export default connect(mapStateToProps)(PromedioGolesTodos)
