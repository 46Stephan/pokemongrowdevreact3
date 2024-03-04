import React, { useEffect } from 'react';
import { CircularProgress, Stack, Grid, PaginationItem } from '@mui/material';
import  Pagination  from '@mui/material/Pagination';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getPokemon } from '../store/modules/pokemonSlice/pokemonSlice';
import PokemonCard from './PokemonCard';

const ListPokemon: React.FC = () => {

    const pokemonRedux = useAppSelector((state) => state.pokemon);
    const { data, currentPage } = pokemonRedux;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPokemon(currentPage));

    }, [currentPage, dispatch, pokemonRedux.currentPage]);


    if (pokemonRedux.loading) {
        return <CircularProgress />;
    }


    return (
        <div>
            <Stack spacing={2}>
                 <Pagination
                    count={10}
                    renderItem={(item) => (
                        <PaginationItem
                            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                            {...item}
          />
        )}
      />
    </Stack>
            <Grid container spacing={2} marginBottom={'30px'} >
    {Array.isArray(data) && data.map((pokemon) => (
        <Grid item key={pokemon.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'inline-grid', justifyContent: 'center' }} >
            <PokemonCard pokemon={pokemon} />
        </Grid>
    ))}
</Grid>
        </div>
    );
};

export default ListPokemon;
