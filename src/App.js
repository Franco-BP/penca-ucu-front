
import './App.css';
import { ProviderPencaUCUContext } from './context/Context.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RulesScreen from './Componentes/screens/RulesScreen.js';
import HomeScreen from './Componentes/screens/HomeScreen.js';
import RegisterScreen from './Componentes/screens/RegisterScreen.js';
import LoginScreen from './Componentes/screens/LoginScreen.js';
import AdminScreen from './Componentes/screens/admin/AdminScreen.js';
import PredictionScreen from './Componentes/screens/PredictionScreen.js';
import ResultsScreen from './Componentes/screens/ResultsScreen.js';


function App() {
  return (
    <BrowserRouter>
      <ProviderPencaUCUContext>
        <Routes>
          <Route path='reglasdejuego' element={<RulesScreen />} />
          <Route path='home' element={<HomeScreen />} />
          <Route path='/' element={<HomeScreen />} />
          <Route path='administrar' element={<AdminScreen />} />
          <Route path='registrarse' element={<RegisterScreen />} />
          <Route path='iniciar' element={<LoginScreen />} />
          <Route path='prediccion' element={<PredictionScreen />} />
          <Route path='resultados' element={<ResultsScreen />} />
        </Routes>
      </ProviderPencaUCUContext>

    </BrowserRouter >
  );
}

export default App;
