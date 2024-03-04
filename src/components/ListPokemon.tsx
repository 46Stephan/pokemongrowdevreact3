import React, { useEffect } from 'react';
import { CircularProgress, Stack, Grid, PaginationItem } from '@mui/material';
import  Pagination  from '@mui/material/Pagination';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getPokemon } from '../store/modules/pokemonSlice/pokemonSlice';
import PokemonCard from './PokemonCard';

const ListPokemon: React.FC = () => {

    const pokemonRedux = useAppSelector((state) => state.pokemon);
    const { data, currentPage, totalPages } = pokemonRedux;
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPokemon(currentPage));

    }, [currentPage, dispatch, pokemonRedux.currentPage]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        if (value !== pokemonRedux.currentPage) {
            dispatch(getPokemon(value))
        }
    };

    if (pokemonRedux.loading) {
        return <CircularProgress />;
    }


    return (
        <div>
            <Stack spacing={2} sx={{ display: 'flex', margin: '10px 0px 20px 15px', alignItems: 'center' }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    variant="outlined"
                    color="secondary"
                    boundaryCount={2}
                    showFirstButton
                    showLastButton
                    renderItem={(item) => (
                        <PaginationItem key={item.page}
                            {...item}
                            onClick={(e) => handlePageChange(e, item.page!)}
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
