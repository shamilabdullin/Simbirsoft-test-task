import React, { Component } from 'react'
import './styles/team.css'

let url = window.location.pathname
let id = url.slice(7,9)

export default class Team extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            error: null,
            isLoading: false,
            matches: [],
            name: '',
        }
    }
    componentDidMount(){
        const myHeaders = new Headers()
        myHeaders.append('X-Auth-Token', process.env.REACT_APP_API_KEY)
        let url = 'http://api.football-data.org/v2/teams/' + id + '/matches'
        fetch(url, {method: 'GET', headers: myHeaders})
        .then(res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded: true,
                    count: result.count,
                    matches: result.matches,
                });
            },
            
            (error) => {
                this.setState({
                    isLoaded: true,
                    error,
                });
            }
        )
        url = 'http://api.football-data.org/v2/teams/' + id
        fetch(url, {method: 'GET', headers: myHeaders})
        .then(res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded: true,
                    name: result.name
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
        const {error, isLoaded, matches, name} = this.state
        if(error){
            return(
                <div className="error">
                    <h2>Error {error.message}</h2>
                </div>
            )
        } else if (!isLoaded){
            return (
                <div className="loading container">
                    <h1>Загрузка</h1>
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            )
        } 
        else return(
            <div className="container team">
                <div className="team-title">
                    <h1>{name}</h1>
                    <hr></hr>
                </div>
                <div className="team-matches-list row">
                    <div className="team-matches-names col">
                        <div className="team-matches-names-title">
                            <h3>Матчи</h3>
                        </div>
                        <div className="team-matches-names-body">
                            <ul>      
                                {matches.map(match => (
                                    <li key={match.id}>
                                        {match.homeTeam.name} - {match.awayTeam.name}
                                    </li>
                                ))}                   
                            </ul> 
                        </div>
                    </div>
                    <div className="team-matches-score col">
                        <div className="team-matches-score-title"> 
                            <h3>Счет</h3>
                        </div>
                        <div className="team-matches-score-body">
                            <ul>
                                {matches.map(match => (
                                    <li key={match.id}>
                                        {match.score.fullTime.homeTeam} - {match.score.fullTime.awayTeam}
                                    </li>
                                ))}    
                            </ul>
                        </div>
                    </div>
                    <div className="team-matches-date col">
                        <div className="team-matches-date-title">
                            <h3>Дата</h3>
                        </div>
                        <div className="team-matches-date-body">
                            <ul>
                                {matches.map(match => (
                                    <li key={match.id}>
                                        {match.utcDate}
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

