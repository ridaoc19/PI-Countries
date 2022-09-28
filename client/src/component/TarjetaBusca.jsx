import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import TarjetaBuscar from "./TarjetaBuscar";
import Filtro, {buscaVacio} from "./Filtro.jsx";

export default function TarjetaBusca() {

  // AL INICIAR
  let paises = useSelector((state) => state.todosPaises);
  let deportPaises = useSelector((state) => state.deportPaises);
  let deportesPaises = new Set(deportPaises?.map(deporte => deporte.nombreDeporte))

  useEffect(() => {
    setInput({buscar: ""})
  }, []);

  // ESTADO LOCAL PARA TODOS
  const inicial = {
    buscar: "",
    ascendente: "",
    continente: "",
    deporte: "",
    poblacion: "",
  };
  const [input, setInput] = useState(inicial); 

  //FILTRO
 Filtro(input, paises)

 // VALIDADOR BUSCAR
 useEffect(() => {
   if(buscaVacio === "País no encontrado") setInput({...input, buscar: ""})
   // eslint-disable-next-line
 },[buscaVacio])
 

  
  // PARA FILTROS NOMBREDEPORTES, CONTINENTES renderizado
  let deportes = <select value={input.deporte} name="deporte" onChange={handleOnChange}>
                    <option value="">Actividad Turistica</option>
                    {[...deportesPaises]?.map((valor, index) => <option key={index} value={valor}>{valor}</option>)};
                 </select>
  
  let continentes = <select value={input.continente} name="continente" onChange={handleOnChange}>
                    <option value="">Continente </option>
                    {[...new Set([...paises].map((valor) => valor.continente))].map((valor, index) => <option key={index} value={valor}>{valor}</option>)};
                  </select>
  
// // onChange
  function handleOnChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value})
  };

  // ONCLICK
  function handleOnClick(e) {
    setInput(inicial)
  };


  return (
    <>
    <TarjetaBuscar 
    handleOnChange={handleOnChange} 
    input={input}
    handleOnClick={handleOnClick}
    deportes={deportes}
    continentes={continentes}
     />
   </>
  );
}


