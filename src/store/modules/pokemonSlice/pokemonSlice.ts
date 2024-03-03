import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Ability, TypePokemon, PokemonSprites } from '../types';
import apiPokemon from '../api/apiPokemon';

interface Pokemon {
    id: number;
    name: string;
    height: number;
    abilities: Ability[];
    sprites: PokemonSprites;
    types: TypePokemon[];
}

interface PokemonState {
    data: Pokemon[];
    loading: boolean;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
}

export const initialState: PokemonState = {
    data: [],
    currentPage: 1,
    loading: false,
    itemsPerPage: 20,
    totalPages: 1,
};

export const getPokemon = createAsyncThunk('getPokemon', async (page: number, { getState }) => {
    const state = getState() as { pokemon: PokemonState };
    const { itemsPerPage } = state.pokemon;
    const response = await apiPokemon.get(`/?limit=${itemsPerPage}&offset=${(page - 1) * itemsPerPage}`);
    const totalCount = response.data.count;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const promises = response.data.results.map((item: any) => axios.get(item.url));
    const result = await Promise.all(promises);
    const data = result.map((response) => response.data);
    return { data, totalPages, page };
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        pokemons: (state, action: PayloadAction<Pokemon[]>) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPokemon.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPokemon.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.page;
        });
    },
});

export const { pokemons } = pokemonSlice.actions;
export default pokemonSlice.reducer;
