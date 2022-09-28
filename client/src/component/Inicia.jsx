import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { cargaPaises } from "../redux/actions";
import style from "../style/inicia.module.css";
import imagen from  "../imagen/fondo.jpg"

function Inicia(props) {

  let paises = useSelector((state) => state.todosPaises);

  useEffect(() => {
    if (!paises[0]) {
      cargaPaises();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className={style.principal}>

        <img src={imagen} alt="no hay" className={style.imagen}/>
          <Link to="p/principal/0" className={style.boton}> Principal </Link>

      </div>
    </div>
  );
}

export default Inicia;
