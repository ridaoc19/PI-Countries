export const CARGA_TODO = "CARGA_TODO";
export const CARGANDO = "CARGANDO";
export const DETALLES_PAIS = "DETALLES_PAIS";
export const TRAER_DEPORTES = "TRAER_DEPORTES";
export const FILTROS = "FILTROS";
export const POST_ACTIVIDAD = "POST_ACTIVIDAD";
export const LIMPIAR = "LIMPIAR";

// CARGA PAISES DE API A BD
export function cargaPaises() {
    fetch("http://localhost:3001/countries")
};

// CARGA EN STORE PAISES, DEPORTES, DEPORTE-PAISES, PAGINADO
export function cargaTodo() {
  return async function (dispatch) {
    dispatch(cargando());
    let deportPais = await deportPaises();
    let todosDeportes = await traerDeportes();
    fetch(`http://localhost:3001/paisesIdDeport`)
      .then((res) => res.json())
      .then((res) =>
        dispatch({
          type: CARGA_TODO,
          paisesDeport: [...res],
          deportPais: [...deportPais],
          todosDeportes: [...todosDeportes],
          paginas: paginados([...res]),
        })
      );
  };
}

// CARGANDO
function cargando() {
  return {
    type: CARGANDO,
  };
}

// TRAE LOS DEPORTES CON LOS PAISES --> la utiliza todosPaises
function deportPaises() {
  return fetch(`http://localhost:3001/deportIdPais`).then((res) => res.json());
}

// TRAER TODOS LOS DEPORTES
function traerDeportes() {
  return fetch(`http://localhost:3001/deportes`).then((respuesta) =>
    respuesta.json()
  );
}


// PAGINADO
function paginados(paises) {
  const paginas = [];
  const estado = paises;
  while (estado.length) {
    if (!paginas[0]) {
      paginas.push(estado.splice(0, 9));
    } else if (estado.length > 10) {
      paginas.push(estado.splice(0, 10));
    } else if (estado.length < 10) {
      paginas.push(estado.splice(0, estado.length));
    }
  }
  return paginas;
}




// DETALLE PAISES
export function detallesPais(id) {
  return function (dispatch) {
    fetch(`http://localhost:3001/countries/${id}`)
      .then((r) => r.json())
      .then((r) => dispatch({ type: DETALLES_PAIS, payload: r }));
  };
}

// POS ACTIVIDADES DEPORTIVAS
export function postActividad({
  SeleccionDeporte,
  dificultad,
  duracion,
  temporada,
  SeleccionPais,
}) {
  var data = {
    nombreDeporte: SeleccionDeporte.nombreDeporte,
    icono: SeleccionDeporte.icono,
    imagen: SeleccionDeporte.imagen,
    descripcion: SeleccionDeporte.descripcion,
    dificultad,
    duracion,
    temporada,
    paises: SeleccionPais?.map((valor) => valor.id),
  };

  return function (dispatch) {
    dispatch(cargando());
    return fetch("http://localhost:3001/activities", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => 
        dispatch({ 
          type: POST_ACTIVIDAD, 
          todosPaises: [...response[0]],
         deportPaises: [...response[1]]
        })
      )
  }
};

// FILTROS
export function filtros(filtro) {
  return {
    type: FILTROS,
    payload: paginados(filtro),
  };
}

// LIMPIAR
export function limpiar(){
  return{
    type: LIMPIAR
  }
}

