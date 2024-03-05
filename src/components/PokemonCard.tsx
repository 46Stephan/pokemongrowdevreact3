/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid, Snackbar, Alert, Chip } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ModalDetail from './ModalDetail';
import  colorType  from '../utils/colorType';
import { favorite } from '../store/modules/pokedexSlice/pokedexSlice';
import { Ability, TypePokemon, PokemonSprites } from '../types/PokemonType';

interface Pokedex {
    id: number;
    name: string;
    height: number;
    abilities: Ability[];
    types: TypePokemon[];
    sprites: PokemonSprites;
}

interface PokemonCardProps {
    pokemon: Pokedex;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const isPokemonInPokedex = useAppSelector((state) => state.pokedex.dataPokedex.find((item: { id: number; }) => item.id === pokemon.id)?.id);

    const handlePokedex = () => {
        const message = isPokemonInPokedex ? "Pokemon removido da POKEDEX com sucesso!" : "Pokemon foi adicionado na POKEDEX com sucesso";
        setAlertMessage(message);
        setOpenAlert(true);
        dispatch(favorite(pokemon));
    };

    const handleClose = () => setOpenModal(false);

    const cardColors: any = colorType[pokemon?.types[0].type.name] || colorType.normal;

    return (
        <>
            <ModalDetail 
            isOpen={openModal} 
            actionCancel={handleClose} 
            pokemon={pokemon} />

            <Box 
            sx={{ display: 'flex', width: '300px', height: '500px', margin: '15px' }}
            >
                <Card 
                sx={{ paddingTop: '15px', backgroundColor: cardColors.card, width: '300px', height: '490px' }}
                >
                    <Button 
                    onClick={handlePokedex} 
                    sx={{ color: isPokemonInPokedex 
                    ? '#ac25eadd' : '#ddd8dd', alignSelf: 'end', display: 'flex', paddingInlineStart: '15px' }}
                    >
                    <StarIcon 
                    sx={{ padding: '3px', borderRadius: '100%', width: '21px', height: '21px', backgroundColor: isPokemonInPokedex 
                    ? "#000" : "#8918d5" }} 
                    className='favoritePokemon' 
                    />
                    </Button>

                    <CardMedia 
                    sx={{ borderRadius: '20px' }} 
                    component="img" 
                    alt={pokemon?.name} 
                    height="250" 
                    width='240' 
                    image={pokemon?.sprites.front_default} 
                    />

                    <CardContent>

                        <Typography 
                        variant="body1" 
                        color='primary.dark'>
                            <strong>{pokemon?.name.toUpperCase()}</strong>
                        </Typography>

                        <Typography 
                        variant="body1" 
                        color="primary.dark">
                            <strong>ID:</strong> {pokemon?.id}
                        </Typography>

                        <Typography 
                        variant="body1" 
                        color="primary.dark">
                            <strong>Height:</strong> {pokemon?.height}
                        </Typography>

                        <Typography 
                        sx={{ marginTop: '10px' }} 
                        variant="body1" >
                            <Chip sx={{ borderRadius: '5px', backgroundColor: cardColors.chip, color: '#000' }} 
                            label={pokemon.types[0].type.name} />
                        </Typography>

                        <Grid 
                        item xs={12} 
                        sx={{ padding: '15px 0px 0px 0px' }} 
                        justifyContent={'center'} 
                        alignItems={'center'}
                        >
                        
                        <Button 
                            onClick={() => setOpenModal(true)} 
                            variant='contained'>Detalhes
                        </Button>

                        </Grid>

                    </CardContent>

                </Card>

                <Snackbar 
                className='styleAlert' 
                open={openAlert} 
                autoHideDuration={1900} 
                onClose={() => setOpenAlert(false)}
                >

                <Alert 
                variant='filled' 
                onClose={() => setOpenAlert(false)} 
                severity="success">{alertMessage}
                </Alert>

                </Snackbar>
            </Box>
        </>
    );
};

export default PokemonCard;
