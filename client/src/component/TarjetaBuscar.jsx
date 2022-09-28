import { buscaVacio } from "./Filtro.jsx";
import style from "../style/tarjetaBusca.module.css";

export default function TarjetaBuscar(props) {
  return (
    <div>
      <div className={style.principal}>
        <div className={style.contenedor}>
          {/* INPUT BUSCAR PAISES */}
          <div className={style.buscar}>
            <input
              type="text"
              name="buscar"
              value={props.input.buscar}
              onChange={props.handleOnChange}
            />
            <h4>{buscaVacio}</h4>
            </div>

          {/* ASCENDENTE */}
          <div className={style.ascendente}>
            <select
              value={props.input.ascendente}
              name="ascendente"
              onChange={props.handleOnChange}
            >
              <option value="">↑ ________ ↓</option>
              <option value="ascendente">Ascendente</option>
              <option value="descendente">Descendente</option>
            </select>
          </div>

          {/* POBLACION */}
          <div className={style.poblacion}>
            <select
              value={props.input.poblacion}
              name="poblacion"
              onChange={props.handleOnChange}
            >
              <option value="">↑ Poblacion ↓</option>
              <option value="ascendente">Ascendente</option>
              <option value="descendente">Descendente</option>
            </select>
          </div>

          {/* DEPORTE */}
          <div>
          {props.deportes}
          </div>

          {/* CONTINENTE */}
          <div>
          {props.continentes}
          </div>

          {/* LIMPIAR */}
          <div className={style.limpiar}>
            <button onClick={props.handleOnClick}>Limpiar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
