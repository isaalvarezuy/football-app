import { initialState } from '../store/initialState';

export const reducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case "VER":

      return { ...state }


    case "TRAER_EQUIPO":
      console.log(action.payload)
      return { ...state, equipoUsuario: action.payload }

    case "ACTUALIZAR_EQUIPOS":

      return { ...state, equipos: action.payload }

    case "ACTUALIZAR_JUGADORES":

      return { ...state, jugadores: action.payload }

    case "ACTUALIZAR_JUGADOR":

      console.log(action.payload);
      console.log(state.jugadores)
      let jugadoresIgual = state.jugadores.filter(jugador => jugador._id !== action.payload._id);
      console.log(jugadoresIgual)
      return { ...state, jugadores: [...jugadoresIgual, action.payload[0]] }

    case "INSERTAR_EQUIPOS":

      return { ...state, equipos: [...state.equipos, action.payload] }

    case "INSERTAR_JUGADOR":

      return { ...state, jugadores: [...state.jugadores, action.payload] }

      case "ELIMINAR_JUGADOR":
      console.log(action.payload);
      let jugadoresNuevos = state.jugadores.filter(jugador => jugador._id !== action.payload._id);
  
      return { ...state, jugadores: jugadoresNuevos}

      case "ELIMINAR_EQUIPO":
        console.log(action.payload);
        let equiposNuevos = state.equipos.filter(eq => eq._id !== action.payload._id);
    
        return { ...state, equipos: equiposNuevos}


    case "INSERTAR_PUNTOS":
      console.log(action.payload);
      let equiposIgual = state.equipos.filter(equipo => equipo._id !== action.payload[0]._id && equipo._id !== action.payload[1]._id);
      console.log(equiposIgual)
      return { ...state, equipos: [...equiposIgual, action.payload[0], action.payload[1]] }


    default:
      return state
  }

}

