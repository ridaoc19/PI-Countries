import './App.css';
import { Route } from "react-router-dom";
import Inicia from './component/Inicia';
import Navega from './component/Navega';
import Tarjetas from './component/Tarjetas';
import Detalles from './component/Detalles';
import TarjetaBusca from './component/TarjetaBusca';
import Actividades from './component/Actividades';


function App() {
  return (
    <div className="App">
    <Route exact path="/" component={Inicia} />
    <Route path="/p/" component={Navega} />
    <Route path="/p/principal" component={TarjetaBusca}/>
    <Route path="/p/principal/:pagina" component={Tarjetas}/>
    <Route path="/p/detalles/:id" component={Detalles}/>
    <Route path="/p/actividad" component={Actividades}/>
    </div>
  );
}

export default App;
