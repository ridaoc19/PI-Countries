
export default function ActividadFunciones(paises, deporte, input) {
  
   // BUSCAR DEPORTES
   let buscaDeporte = [...deporte].filter((valor) => {
    if (input.buscarDeporte) {
      return valor.nombreDeporte
        .toString()
        .toLowerCase()
        .includes(input.buscarDeporte.toLowerCase());
    } else {
      return "";
    }
  });

  // BUSCAR PAISES
  let buscaPaises = [...paises].filter((valor) => {
    if (input.buscarPais) {
      return valor.nombre
        .toString()
        .toLowerCase()
        .includes(input.buscarPais.toLowerCase());
    } else {
      return "";
    }
  });



  return {
    buscaPaises,
    buscaDeporte,
  }
  
}
