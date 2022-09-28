import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postActividad } from "../redux/actions.js";
import Actividad from "./Actividad.jsx";
import ActividadFunciones from "./ActividadFunciones";

export default function Actividades(props) {
  // AL INICIAR
  let dispatch = useDispatch();
  let paises = useSelector((state) => state.todosPaises);
  let deporte = useSelector((state) => state.traerDeportes);
  let cargando = useSelector((state) => state.cargando);

  // ESTADO LOCAL
  const initialState = {
    buscarDeporte: "",
    buscarPais: "",
    temporada: "",
    dificultad: "",
    duracion: "",
    SeleccionPais: [],
    SeleccionDeporte: {},
    enviado: false,
  };

  const [input, setInput] = useState(initialState);
  const [error, setError] = useState({});

  const { buscaDeporte, buscaPaises } = ActividadFunciones(
    paises,
    deporte,
    input
  );

  // VALIDACIONES
  function validaciones(input, paises, deporte, name, value) {
    if (name === "SeleccionPais") {
      if (input.SeleccionPais.find((pais) => pais.nombre === value)) {
        setError({ [name]: "País ya seleccionado" });
      } else if (
        [...paises]
          .find((valor) => valor.nombre === value)
          .actividades.map((valor) => valor.nombreDeporte)
          .includes(input.SeleccionDeporte.nombreDeporte)
      ) {
        setError({ [name]: "País ya cuenta con este Deporte" });
      } else if (!input.SeleccionDeporte.nombreDeporte) {
        setError({ [name]: "Primero selecciona el deporte" });
      } else {
        setInput({
          ...input,
          [name]: [
            ...input.SeleccionPais,
            [...paises].find((valor) => valor.nombre === value),
          ],
          buscarDeporte: "",
          buscarPais: "",
        });
        setError({});
      }
    }

    if (name === "SeleccionDeporte") {
      setInput({
        ...input,
        [name]: [...deporte].find((valor) => valor.nombreDeporte === value),
        buscarDeporte: "",
        buscarPais: "",
      });
      setError({});
    }

    if (name === "eliminarPais") {
      setInput({
        ...input,
        SeleccionPais: input.SeleccionPais.filter(
          (valor) => valor.id !== value
        ),
      });
    }

    if (name === "enviar") {
      if (
        !input.temporada ||
        !input.dificultad ||
        !input.duracion ||
        !input.SeleccionPais[0] ||
        !input.SeleccionDeporte
      ) {
        setError({ [name]: "Falta diligenciar Información" });
      } else {
        return (
          dispatch(postActividad(input)),
          setError({}),
          setInput({
            buscarDeporte: "",
            buscarPais: "",
            temporada: "",
            dificultad: "",
            duracion: "",
            SeleccionPais: [],
            SeleccionDeporte: {},
            enviado: true,
          })          
        );
      }
    }

    if (name === "limpiar"){
      setError({})
      setInput(initialState)
    };

    if (name === "duracion") {
      if (!Number(value)) {
        return (
          setError({ [name]: "Deben ser numeros" }),
          setInput({ ...input, duracion: "" })
        );
      } else if (parseInt(value) > 190) {
        return setError({ [name]: "Solo puede tener de 1 a 190 Horas" });
      } else {
        return (setInput({ ...input, [name]: value }), setError({}));
      }
    }
  }

  // CLICK
  function handleOnClick(e) {
    e.preventDefault();
    validaciones(input, paises, deporte, e.target.name, e.target.value);
  }

  //CHANGE
  function handleOnChange(e) {
    e.target.name === "duracion"
      ? validaciones(input, paises, deporte, e.target.name, e.target.value)
      : setInput({ ...input, [e.target.name]: e.target.value });
  }

  // MENSAJE ENVIADO
  useEffect(() => {
    setTimeout(() => {
      setInput({...input, enviado: false})
    }, 3000);
  // eslint-disable-next-line
  },[input.enviado])

  return (
    <div>
      {cargando === true ? (
        <h1> Cargando Información...</h1>
      ) : (
        <Actividad
          handleOnChange={handleOnChange}
          input={input}
          buscaDeporte={buscaDeporte}
          buscaPaises={buscaPaises}
          handleOnClick={handleOnClick}
          postActividad={postActividad}
          error={error}
        />
      )}
    </div>
  );
}
