import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detallesPais, limpiar } from "../redux/actions.js";
import style from "../style/detalles.module.css";

function Detalles(props) {
  let dispatch = useDispatch();
  let params = useParams();

  let { id } = params;

  useEffect(() => {
    dispatch(detallesPais(id));

    return () => {
      dispatch(limpiar())
    };
    // eslint-disable-next-line
  }, []);

  let detalles = useSelector((state) => state.detallePais);

  return (
    <div>
      <div className={style.pincipal}>
        <div className={style.contenedor}>
          <div className={style.contenedorpais}>
            <img className={style.bandera} src={detalles.imagen} alt="no hay" />
            <p className={style.pais}>{detalles.nombre}</p>
            <p className={style.capital}>{detalles.capital}</p>
            <p className={style.continente}>{detalles.continente}</p>
            <p className={style.poblacion}>{detalles.poblacion}</p>
            <p className={style.area}>{detalles.area}</p>

          </div>
          <div className={style.contenedordeporte}>
            {detalles.actividades?.map((valor) => {
              return (
                <div key={valor.id}>
                  <div className={style.deporte}>
                    <img className={style.imagen} src={valor.imagen} alt="no hay" />
                    <h3 className={style.nombre} ><img src={valor.icono} alt="icono" width="30" />{valor.nombreDeporte}</h3>
                    <label className={style.dificultad} > Dificultad: {valor.dificultad}</label>
                    <label className={style.duracion}> Duracion: {valor.duracion} </label>
                    <p className={style.descripcion}>{valor.descripcion}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detalles;
