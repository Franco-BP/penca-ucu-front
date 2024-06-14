import logo from './logo.svg';
import './App.css';
import TopBar from './Componentes/TopBar';
import MatchCard from './Componentes/MatchCard';
import { ProviderPencaUCUContext } from './Context/context.js';
import Contenido from './Componentes/Contenido.js';
import RankingTable from './Componentes/UserRanking.js';

function App() {
  return (
    <ProviderPencaUCUContext>
      <div className="App">
        <TopBar />
        <MatchCard />
        <Contenido />
        <RankingTable />
      </div>
    </ProviderPencaUCUContext>
  );
}

export default App;
