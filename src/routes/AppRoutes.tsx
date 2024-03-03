import DefaultLayout from '../config/layout/DefaultLayout';
import Home from '../pages/Home';
import Pokedex from '../pages/Pokedex';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout 
        children={<Home />} 
        />
    },
    {
        path: '/pokedex',
        element: <DefaultLayout 
        children={<Pokedex />} 
        />
    },

]);

const AppRoutes: React.FC = () => {
    return <RouterProvider 
    router={router} />;
};

export default AppRoutes;
