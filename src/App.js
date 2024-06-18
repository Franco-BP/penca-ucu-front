
import './App.css';
import { ProviderPencaUCUContext } from './context/context.js';
import Layout from './Componentes/Layout.js';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Layout2 from './Componentes/Layout2.js';
import RulesScreen from './Componentes/screens/RulesScreen.js';
import HomeScreen from './Componentes/screens/HomeScreen.js';


function App() {
  return (
    <BrowserRouter>
      <ProviderPencaUCUContext>
      <Routes>
          <Route path='Layout' element={<RulesScreen />} />
          <Route path= 'Layout2' element={<HomeScreen/>}/>
       </Routes>
      </ProviderPencaUCUContext>
   
    </BrowserRouter >
  );
}

export default App;
