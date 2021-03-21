import React from 'react';
import Pokedex from './Pokedex'
import Pokemon from './Pokemon'
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Switch >
      <Route path='/' exact render={(props) => <Pokedex {...props} />} /> 
      <Route path='/:pokemonId' exact render={(props) => <Pokemon {...props} />} /> 
    </Switch>
  );
}

export default App;
