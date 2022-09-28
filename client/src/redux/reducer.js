import {
  CARGA_TODO,
  DETALLES_PAIS,
  CARGANDO,
  FILTROS,
  POST_ACTIVIDAD,
  LIMPIAR,
} from "./actions.js";

const initialState = {
  todosPaises: [],
  deportPaises: [],
  traerDeportes: [],
  paginado: [],
  cargando: "pendiente",
  detallePais: {},
  postActividad: {},
};

export default function reducer(state = initialState, actions) {
  // console.log(actions);
  switch (actions.type) {
    case CARGA_TODO:
      return {
        ...state,
        todosPaises: actions.paisesDeport,
        paginado: actions.paginas,
        cargando: false,
        deportPaises: actions.deportPais,
        traerDeportes: actions.todosDeportes,
      };

    case CARGANDO:
      return { ...state, cargando: true };

    case DETALLES_PAIS:
      return { ...state, detallePais: actions.payload };

    case FILTROS:
      return { ...state, paginado: actions.payload };

    case POST_ACTIVIDAD:
      return {
        ...state,
        cargando: false,
        todosPaises: actions.todosPaises,
        deportPaises: actions.deportPaises
      };

    case LIMPIAR:
      return { ...state, detallePais: {} };

    default:
      return state;
  }
}
