import React, { Component } from 'react'
import './styles/teams.css'

export default class Teams extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            error: null,
            isLoaded: false,
            teams: [],
        }
    }

    componentDidMount(){ 
        const myHeaders = new Headers()
        myHeaders.append('X-Auth-Token', process.env.REACT_APP_API_KEY)
        fetch("http://api.football-data.org/v2/teams", {method: 'GET', headers: myHeaders})
        .then(res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded: true,
                    teams: result.teams
                });
            },
            
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    
    render() {   
        const {error, isLoaded, teams} = this.state
        if(error){
            return(
                <div className="error">
                    <h2>Error {error.message}</h2>
                </div>
            )
        } else if (!isLoaded){
            return (
                <div className="listOfLeagues loading container">
                    <h1>Загрузка</h1>
                    <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                    </div>
                </div>
            )
        } 
        else return(
            <div className="container teams">
                <div className="teams-title">
                    <h1>Команды</h1>
                    <hr></hr>
                </div>
                <div className="teams-list">
                    <div className="teams-list-title">
                        <h3>Название команды</h3>
                    </div>
                    <div className="teams-list-body">
                        <ul>
                            {teams.map(team => (
                                <li key = {team.id}>
                                    <a href={`/teams/${team.id}/matches`}>{team.name} </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}