const { Router } = require("express");
const { Paises, Actividades } = require("../db");
const axios = require("axios");

const router = Router();

// TRAE EL LISTADO PAISES DE LA API Y  LO LLEVA A LA BD  /countries
router.get("/countries", async (req, res, next) => {
  try {

    const verifica = await Paises.findAll();

    if(!verifica[0]){

    let paises = await axios.get("https://restcountries.com/v3/all");

    let filtro = paises.data.map((valor) => {
      return {
        id: valor.cca3,
        nombre: valor.name.common ? valor.name.common : "no tiene nombre",
        imagen: valor.flags[0] ? valor.flags[0] : "no tiene imagen",
        continente: valor.continents[0]
          ? valor.continents[0]
          : "no tiene continente",
        capital: valor.capital ? valor.capital[0] : "no tiene capital",
        subregion: valor.subregion,
        area: valor.area,
        poblacion: valor.population,
        icono: valor.flag,
      };
    });

    const bdPaises = await Paises.bulkCreate(filtro);

    return res.status(200).json("API cargada correctamente en la BD")

  } else {
    return res.status(200).json("Ya tiene cargado todos los paises en BD");
  }

  } catch (error) {
    res.status(404).json({ error: error.messages })
        next();
      }
});

// CREA UNA ACTIVIDAD DEPORTIVA POR BODY /activities
router.post("/activities", async (req, res, next) => {
  let {
    nombreDeporte,
    dificultad,
    duracion,
    temporada,
    descripcion,
    icono,
    imagen,
    paises,
  } = req.body;
  try {
    // console.log( nombre, dificultad, duracion, temporada)
    let nuevActividad = await Actividades.create({
      nombreDeporte,
      dificultad,
      duracion,
      temporada,
      descripcion,
      icono,
      imagen,
    });
    // console.log(nuevActividad.__proto__)
    paises?.forEach((element) => {
      nuevActividad.addPaises(element);
    });
    // nuevActividad.addCountries(paises)

    // INVENTO
    const pais = await Paises.findAll();
    const paisdeport = await Paises.findAll({include: Actividades,});
    const deportpais = await Actividades.findAll({include: Paises,});

    res.status(200).json([paisdeport, deportpais]);

  } catch (error) {
    res.status(404).json({ error: error.messages })
    next();
  }
});

// DETALLE POR ID (PARAMS)  /countries/{idPais}
router.get("/countries/:idPais", async (req, res, next) => {
  try {
    let id = req.params.idPais;

    const project = await Paises.findOne({
      where: { id: id },
      include: Actividades,
    });

    res.status(200).json(project);

  } catch (error) {
    res.status(404).json({ error: error.messages })
    next();
  }
});

// TRAE PAISES CON EL DEPORTE BD
router.get("/paisesIdDeport", async (req, res, next) => {
  try {
    
    const paisdeport = await Paises.findAll({
      include: Actividades,
    });

    res.status(200).json(paisdeport);

  } catch (error) {
    res.status(404).json({ error: error.messages })
    next();
  }
});

// TRAE DEPORTES CON EL PAIS BD
router.get("/deportIdPais", async (req, res, next) => {
  try {
    
    const paisdeport = await Actividades.findAll({
      include: Paises,
    });

    res.status(200).json(paisdeport);

  } catch (error) {
    res.status(404).json({ error: error.messages })
    next();
  }
});

// TRAE TODOS LOS DEPORTES DE API
router.get("/deportes", async (req, res, next) => {
  try {
    let deportes = await axios.get("https://sports.api.decathlon.com/sports");

    let filtro = deportes.data.data.filter((valor, index) => {
      return (
        valor.attributes.parent_id === null &&
        valor.attributes.icon !== null &&
        valor.attributes.description !== null
      );
    });

    let map = filtro.map((valor, index) => {
      return {
        nombreDeporte: valor.attributes.name,
        descripcion: valor.attributes.description,
        icono: valor.attributes.icon,
        imagen: valor.relationships.images.data[0].url,
      };
    });

    res.status(200).json(map);

  } catch (error) {
    res.status(404).json({ error: error.messages })
    next();
  }
});

// ENSAYO
router.get("/ensayo", (req, res, next) => {
  try {

    const paisdeport = Promise.resolve(Paises.findAll({include: Actividades}))
    // const paisdeport =  Paises.findAll({include: Actividades});

      // Promise.all([paisdeport])
      // .then(res => res.json(res))
      paisdeport.then((value) => {
        res.status(200).json(value)
      })

    // res.status(200).json(paisdeport);

  } catch (error) {
    res.status(404).json({ error: error.messages })
    next();
  }
});


// CREAR PAIS
router.post("/crearpais", async (req, res, next) => {
 let {id, nombre, imagen, continente, capital, subregion, area, poblacion} = req.body;

 try {

  let crearpais = await Paises.create({
    id, 
    nombre, 
    imagen, 
    continente, 
    capital, 
    subregion, 
    area, 
    poblacion
  })

  res.status(200).json(crearpais);

  
 } catch (error) {
  res.status(404).json({error: error.messages});
  next();
  
 }



 
})

module.exports = router;
