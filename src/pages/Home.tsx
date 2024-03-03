import React from 'react';
import ListPokemon from '../components/ListPokemon';
import NavBar from '../components/NavBar';

const Home: React.FC = () => (
    <>
        <NavBar />
        <ListPokemon />
    </>
);

export default Home;
