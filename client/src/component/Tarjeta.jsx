import React from "react";
import { Link } from "react-router-dom";
import style from "../style/tarjeta.module.css";

function Tarjeta(props) {
  return (
    <div>
      <div className={style.tarjeta}>
        <Link to={`/p/detalles/${props.id}`}>
         <img src={props.imagen} alt="no hay" width="120px" className={style.bandera} /> </Link>
        <Link to={`/p/detalles/${props.id}`}> <h4>{props.nombre}</h4> </Link>
        <h6 className={style.continente}>{props.continente}</h6>
        <p className={style.poblacion}>{props.poblacion}</p>
      </div>
    </div>
  );
}

export default Tarjeta;
