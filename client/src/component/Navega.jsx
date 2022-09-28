import React from "react";
import { Link } from "react-router-dom";
import style from '../style/navega.module.css';
import { cargaTodo } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function Navega(props) {
  let dispatch = useDispatch()

  let paises =  useSelector((state) => state.todosPaises);


  if (!paises[0]) {
    dispatch(cargaTodo());
  }

  return (
    <div>
      <div className={style.contenedor}>
      <Link className={style.inicial} to="/"> inicial </Link>
      <Link className={style.principal} to={`/p/principal/0`}> Principal </Link>
      <Link className={style.actividad} to={"/p/actividad"}> Actividad </Link>
      </div>
    </div>
  );
}

export default Navega;
