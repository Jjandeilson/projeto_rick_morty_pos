import { Route, Routes } from 'react-router-dom';
import './App.css';

import Main from './pages/main'; 
import ListaPersonagem from './pages/personagem/list-personagem';
import CardPersonagem from './pages/personagem/card-personagem';
import ListEpisodio from './pages/episodio/list-episodio';
import CardEpisodio from './pages/episodio/card-episodio';
import ListLocalizacao from './pages/localizacao/list-localizacao';
import CardLocalizacao from './pages/localizacao/card-localizacao';
import Home from './pages/home';

function App() {
  return (
   <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="personagens">
          <Route path="" element={<ListaPersonagem />} />
          <Route path=":id" element={<CardPersonagem />} />
        </Route>
        <Route path="episodios">
          <Route path="" element={<ListEpisodio />} />
          <Route path=":idEpisodio" element={<CardEpisodio />} />
        </Route>
        <Route path="localizacoes">
          <Route path="" element={<ListLocalizacao />} />
          <Route path=":id" element={<CardLocalizacao />} />
        </Route>
      </Route>
   </Routes>
  );
}

export default App;
