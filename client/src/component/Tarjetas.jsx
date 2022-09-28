import React from "react";
import { useSelector } from "react-redux";
import style from "../style/tarjeta.module.css";
import Tarjeta from "./Tarjeta.jsx";
import { useParams, Link, useHistory } from "react-router-dom";

function Tarjetas(props) {
  let params = useParams();
  let pagina = params.pagina;
  let history = useHistory();

  const cargando = useSelector((state) => state.cargando);
  const paginado = useSelector((state) => state.paginado);

  function handleOnClick(e) {
    if (e.target.name === "anterior") {
      if (params.pagina < 1) return;
      history.push(`/p/principal/${params.pagina - 1}`);

    } else if (e.target.name === "siguiente") {
      if (params.pagina >= paginado.length - 1) return;
        history.push(`/p/principal/${Number(params.pagina) + 1}`);
    }
  }

  return (
    <div>
      <div className={style.contenedor}>
        <div className={style.tarjetas}>
          {cargando === true ? (
            <h1>Cargando...</h1>
          ) : (
            paginado[pagina]?.map((valor) => (
              <Tarjeta
                key={valor.id}
                id={valor.id}
                imagen={valor.imagen}
                nombre={valor.nombre}
                continente={valor.continente}
                poblacion={valor.poblacion}
              />
            ))
          )}
        </div>

        <div className={style.footer}>
          <button name="anterior" onClick={handleOnClick}>
            ←
          </button>
          {paginado.map((element, index) => (
            <Link to={`/p/principal/${index}`} key={index} className={style.boton}> {index + 1} </Link>))}
          <button name="siguiente" onClick={handleOnClick}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tarjetas;
