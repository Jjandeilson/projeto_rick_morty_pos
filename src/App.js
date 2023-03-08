import { Route, Routes } from 'react-router-dom';
import './App.css';
import CardPersonagem from './componetes/personagem/card-personagem';

import ListaPersonagem from './componetes/personagem/list-personagem';
import Main from './pages/main'; 

function App() {
  return (
   <Routes>
      <Route path="/" element={<Main />}>
        <Route path="personagens" >
          <Route path="" element={<ListaPersonagem />} />
          <Route path=":id" element={<CardPersonagem />} />
        </Route>
      </Route>
   </Routes>
  );
}

export default App;
