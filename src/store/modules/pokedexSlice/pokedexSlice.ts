import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Ability, TypePokemon, PokemonSprites } from '../types';
import apiPokemon from '../api/apiPokemon';

interface Pokedex {
    id: number;
    name: string;
    height: number;
    abilities: Ability[];
    sprites: PokemonSprites;
    types: TypePokemon[];
}

interface PokemonState {
    dataPokedex: Pokedex[];
    loading: boolean;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
}

export const initialState: PokemonState = {
    dataPokedex: [],
    currentPage: 1,
    loading: false,
    itemsPerPage: 20,
    totalPages: 1,
};

export const getPokedex = createAsyncThunk('getPokedex', async (_, { getState }) => {
    const state = getState() as { pokemon: PokemonState };
    const promises = state.pokemon.dataPokedex.map((pokemon) => apiPokemon.get(`/${pokemon.id}`));
    const result = await Promise.all(promises);
    return result.map((response) => response?.data) || [];
});

const pokedexSlice = createSlice({
    name: 'pokedex',
    initialState,
    reducers: {
        favorite: (state, action: PayloadAction<Pokedex>) => {
            const index = state.dataPokedex.findIndex((pokemon) => pokemon.id === action.payload.id);
            if (index >= 0) {
                state.dataPokedex.splice(index, 1);
            } else {
                state.dataPokedex.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPokedex.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPokedex.fulfilled, (state, action) => {
            state.loading = false;
            state.dataPokedex = action.payload;
        });
    },
});

export const { favorite } = pokedexSlice.actions;
export default pokedexSlice.reducer;
