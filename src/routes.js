import {Switch, Route, Redirect}  from 'react-router-dom'
import Header from './components/Header'
import Competitions from './pages/Competitions'
import Teams from './pages/Teams'
import MainPage from './pages/MainPage'
import Competition from './pages/Competition'
import Team from './pages/Team'

export const useRoutes = () => {
    return(
        <Switch>
            <Route path="/" exact>
                <Header />
                <MainPage />
            </Route>
            <Route path="/competitions" exact>
                <Header />
                <Competitions />
            </Route>
            <Route path="/competitions/:id" exact>
                <Header />
                <Competition/>
            </Route>
            <Route path="/teams" exact>
                <Header />
                <Teams />
            </Route>
            <Route path="/teams/:id/matches/" exact>
                <Header />
                <Team />
            </Route>
        </Switch>
    )
}