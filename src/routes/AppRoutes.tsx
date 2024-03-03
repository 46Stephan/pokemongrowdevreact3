import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Pokedex from '../pages/Pokedex';
import DefaultLayout from '../config/layout/DefaultLayout';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <DefaultLayout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/pokedex" component={Pokedex} />
                </Switch>
            </DefaultLayout>
        </Router>
    );
};

export default AppRoutes;
