
import './App.css';
import { ProviderPencaUCUContext } from './context/context.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RulesScreen from './Componentes/screens/RulesScreen.js';
import HomeScreen from './Componentes/screens/HomeScreen.js';
import RegisterScreen from './Componentes/screens/RegisterScreen.js';
import LoginScreen from './Componentes/screens/LoginScreen.js';


function App() {
  return (
    <BrowserRouter>
      <ProviderPencaUCUContext>
        <Routes>
          <Route path='reglas' element={<RulesScreen />} />
          <Route path='home' element={<HomeScreen />} />
          <Route path='/' element={<HomeScreen />} />
          <Route path='registrarse' element={<RegisterScreen />} />
          <Route path='iniciar' element={<LoginScreen />} />
        </Routes>
      </ProviderPencaUCUContext>

    </BrowserRouter >
  );
}

export default App;
