import React, { Component } from 'react'
import './styles/competition.css'

const url = window.location.pathname
const id = url.slice(14)

export default class Competition extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            error: null,
            isLoaded: false,
            competition: {},
            games: [],
        }
    }

    componentDidMount(){
        const myHeaders = new Headers()
        myHeaders.append('X-Auth-Token', process.env.REACT_APP_API_KEY)
        console.log(id)
        const url = 'http://api.football-data.org/v2/competitions/' + id + '/matches'
        fetch(url, {method: 'GET', headers: myHeaders})
        .then(res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded: true,
                    count: result.count,
                    competition: result.competition,
                    games: result.matches,
                });
            },
            
            (error) => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            }
        )
    }
    
    render() {
        const {error,isLoaded, competition, games} = this.state
        const compName = competition.name
        if(error){
            return(
                <div className="listOfLeagues error container">
                    <h2>Error {error.message}</h2>
                </div>
            )
        } else if (!isLoaded){
            return(
                <div className="listOfLeagues loading container">
                    <h1>Загрузка</h1>
                    <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        } 
        else return(
            <div className="competition container">
                <div className="competition-title">
                    <h1>{compName}</h1>
                    <hr></hr>
                </div>
                <div className="competition-games row">
                    <div className="competition-teams col">
                        <div className="competition-teams-title">
                            <h3>Матчи</h3>
                        </div>
                        <div className="competition-teams-body">
                            <ul>
                                {games.map(game => (
                                    <li key = {game.id}>
                                        {game.homeTeam.name} - {game.awayTeam.name} 
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="competition-score col">
                        <div className="competition-score-title">
                            <h3>Счет</h3>
                        </div>
                        <div className="competition-score-body">
                            <ul>
                                {games.map(game => (
                                    <li key = {game.id}>
                                        {game.score.fullTime.homeTeam} -  {game.score.fullTime.awayTeam}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="competition-date col">
                        <div className="competition-date-title">
                            <h3>Дата</h3>
                        </div>
                        <div className="competition-date-body">
                            <ul>
                                {games.map(game => (
                                    <li key = {game.id}>
                                        {game.utcDate.slice(0,10)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}
