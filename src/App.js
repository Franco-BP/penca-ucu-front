import logo from './logo.svg';
import './App.css';
import TopBar from './Componentes/TopBar';
import MatchCard from './Componentes/MatchCard';
import { ProviderPencaUCUContext } from './context/context.js';
import Contenido from './Componentes/Contenido.js';
import Footer from './Componentes/Footer.js';
import Layout from './Componentes/Layout.js';


function App() {
  return (
    <ProviderPencaUCUContext>
     <Layout/>
    </ProviderPencaUCUContext>
  );
}

export default App;
