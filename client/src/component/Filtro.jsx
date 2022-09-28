import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { filtros } from "../redux/actions";


export let buscaVacio = ""
export default function Filtro(input, paises) {
  let history = useHistory();
  let dispatch = useDispatch();

  let deportes = useSelector((state) => state.deportPaises);

  let filtro = [...paises];
  
    // ACTIVIDADES TURISTICAS
    if (input.deporte) {
      filtro = deportes.filter(valor => valor.nombreDeporte === input.deporte).map((valor) => valor.paises).flat();
    };

    // BUSCAR
    if (input.buscar){
    let buscar = filtro.filter(valor => valor.nombre.toLowerCase().includes(input.buscar.toLowerCase()));
    
    if(!buscar[0]){
       buscaVacio = "País no encontrado";
      }else{
        filtro = buscar
        buscaVacio = ""

      } 
}
    // CONTINENTE
    if (input.continente) {
      filtro = filtro.filter((valor) => valor.continente === input.continente);
    }

    // ASCENDENTE O DESCENDENTE
    if (input.ascendente) {
      if (input.ascendente === "ascendente") {
        filtro = filtro.sort((a, b) => a.nombre.localeCompare(b.nombre));
      } else {
        filtro = filtro.sort((b, a) => a.nombre.localeCompare(b.nombre));
      }
    }

    // POBLACION
    if (input.poblacion) {
      if (input.poblacion === "ascendente") {
        filtro = filtro.sort((a, b) => a.poblacion - b.poblacion);
      } else {
        filtro = filtro.sort((b, a) => a.poblacion - b.poblacion);
      }
    }
  

  useEffect(() => {
    dispatch(filtros(filtro));
    history.push(`/p/principal/${0}`);
    // eslint-disable-next-line
  }, [input]);
}
