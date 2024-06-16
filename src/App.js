
import './App.css';
import { ProviderPencaUCUContext } from './context/context.js';
import Layout from './Componentes/Layout.js';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Layout2 from './Componentes/Layout2.js';


function App() {
  return (
    <BrowserRouter>
      <ProviderPencaUCUContext>
      <Routes>
          <Route path='Layout' element={<Layout />} />
          <Route path= 'Layout2' element={<Layout2/>}/>
       </Routes>
      
      </ProviderPencaUCUContext>
   
    </BrowserRouter >
  );
}

export default App;
