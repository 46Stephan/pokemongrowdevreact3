
import { combineReducers } from '@reduxjs/toolkit';

import pokemonSlice from './pokemonSlice/pokemonSlice';
import pokedexSlice from './pokedexSlice/pokedexSlice';

const rootReducer = combineReducers({
    pokemon: pokemonSlice,
    pokedex: pokedexSlice
});

export default rootReducer;
