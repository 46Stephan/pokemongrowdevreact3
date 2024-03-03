import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useAppSelector } from '../hooks';
import NavBar from '../components/NavBar';
import PokemonCard from '../components/PokemonCard';
import { Ability, TypePokemon, PokemonSprites } from '../types';

interface Pokedex {
    id: number;
    name: string;
    height: number;
    abilities: Ability[];
    types: TypePokemon[];
    sprites: PokemonSprites;
}

const Pokedex: React.FC = () => {
    const [error, setError] = useState('');
    const pokedexRedux = useAppSelector((state) => state.pokedex);

    useEffect(() => {
        if (!pokedexRedux.dataPokedex.length) {
            setError("Nenhum pokemon favoritado ainda");
        }
    }, [pokedexRedux]);

    return (
        <div>
            <NavBar />
            <Grid container spacing={2}>
                {pokedexRedux.loading ? (
                    <CircularProgress />
                ) : (
                    !pokedexRedux.dataPokedex.length ? (
                        <h1>{error}</h1>
                    ) : (
                        pokedexRedux.dataPokedex.map((pokemon: Pokedex) => (
                            <Grid item key={pokemon.id} xs={12} sm={5} md={4} lg={3} sx={{ margin: '15px', display: 'inline-grid', justifyContent: 'center' }}>
                                <PokemonCard pokemon={pokemon} />
                            </Grid>
                        ))
                    )
                )}
            </Grid>
        </div>
    );
};

export default Pokedex;
