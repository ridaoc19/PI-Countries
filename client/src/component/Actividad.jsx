import style from "../style/actividad.module.css";

export default function Actividad(props) {
  return (
    <div>
      <div className={style.principal}>
        <div className={style.contenedor}>
          {/* BUSCAR DEPORTES */}
          <div className={style.contenedordeportes}>
            <div className={style.buscad}>
              <input
                type="text"
                placeholder="Buscar Deporte"
                name="buscarDeporte"
                value={props.input.buscarDeporte}
                onChange={props.handleOnChange}
              />
            </div>
            <div className={style.resutadod}>
              {props.buscaDeporte?.map((valor, index) => (
                <div key={index}>
                  <button
                    className={style.botond}
                    value={valor.nombreDeporte}
                    name="SeleccionDeporte"
                    onClick={props.handleOnClick}
                  >
                    <img src={valor.icono} alt="" width="30px" />
                    {valor.nombreDeporte}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* BUSCAR PAIS */}
          <div className={style.contenedorpais}>
            <div className={style.buscap}>
              <input
                type="text"
                placeholder="Buscar Pais"
                name="buscarPais"
                value={props.input.buscarPais}
                onChange={props.handleOnChange}
              />
              {props.error.SeleccionPais && <p>{props.error.SeleccionPais}</p>}{" "}
              {/* mensaje */}
            </div>
            <div className={style.resutadop}>
              {props.buscaPaises.map((valor, index) => (
                <div key={index}>
                  <button
                    className={style.botonp}
                    value={valor.nombre}
                    name="SeleccionPais"
                    onClick={props.handleOnClick}
                  >
                    <img src={valor.imagen} alt="no" width="20px" />
                    {valor.nombre}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ////////////////////CONTENEDOR BOTON ENVIAR ////////////////////////////// */}
          <div className={style.contenedordiligencia}>
            {/* NOMBRE DEPORTE */}
            <div className={style.nombredeporte}>
              <h1>{props.input.SeleccionDeporte.nombreDeporte}</h1>
            </div>

            {/* TEMPORADA */}
            <div className={style.temporada}>
              <select
                value={props.input.temporada}
                name="temporada"
                onChange={props.handleOnChange}
              >
                <option value="">Slececcione Temporada</option>
                <option value="Verano">Verano</option>
                <option value="Otoño">Otoño</option>
                <option value="Invierno">Invierno</option>
                <option value="Primavera">Primavera</option>
              </select>
            </div>

            {/* DIFICULTAD */}
            <div className={style.dificultad}>
              <select
                value={props.input.dificultad}
                name="dificultad"
                onChange={props.handleOnChange}
              >
                <option value="">Seleccione dificultad</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            {/* DURACION */}
            <div className={style.duracion}>
              <input
                type="text"
                id="numero"
                placeholder="Duración"
                name="duracion"
                value={props.input.duracion}
                onChange={props.handleOnChange}
              />
              {props.error.duracion && <p>{props.error.duracion}</p>}{" "}
              {/* mensaje */}
            </div>

            {/* BOTON */}
            <div className={style.enviar}>
              <button name="enviar" onClick={props.handleOnClick}>Enviar</button> {" "}
              <button name="limpiar" onClick={props.handleOnClick}>Limpiar</button>
               {/* mensajes */}
              {props.error.enviar && <p>{props.error.enviar}</p>}{" "}
              {props.input.enviado && <h3>Actividad guardada</h3>}
            </div>

            {/* IMAGEN Y DESCRIPCION DEPORTE */}
            <div className={style.descripcion}>
              <img
                src={props.input.SeleccionDeporte.imagen}
                alt=""
                width="200px"
                
              />
              <p>{props.input.SeleccionDeporte.descripcion}</p>

              {/* RENDERIZA PAISES SELECCIONADOS */}
              <div className={style.renderizapais}>
                {props.input.SeleccionPais?.map((pais) => (
                  <div key={pais.id}>
                    <div className={style.paiselecciona}>
                    <img className={style.imagenep} src={pais.imagen} alt="no" width="20px" />
                    <p className={style.nombrep}>{pais.nombre}</p>
                    <button className={style.botonep} name="eliminarPais" value={pais.id} onClick={props.handleOnClick}> X </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
