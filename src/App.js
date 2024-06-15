import logo from './logo.svg';
import './App.css';
import TopBar from './Componentes/TopBar';
import MatchCard from './Componentes/MatchCard';
import { ProviderPencaUCUContext } from './context/context.js';
import Contenido from './Componentes/Contenido.js';
import PredictionCard from './Componentes/PredictionCard/PredictionCard.js';

function App() {
  return (
    <ProviderPencaUCUContext>
      <div className="App">
        <TopBar />
        <MatchCard />
        <Contenido />
        <PredictionCard />
      </div>
    </ProviderPencaUCUContext>
  );
}

export default App;
