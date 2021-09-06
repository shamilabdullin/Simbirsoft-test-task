import React, { Component } from 'react'
import './styles/competitions.css'
import freeCompetitions from '../consts'

export default class Competitions extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            error: null,
            isLoaded: false,
            competitions: [],
        }
    }

    componentDidMount(){
        const myHeaders = new Headers()
        myHeaders.append('X-Auth-Token', process.env.REACT_APP_API_KEY)
        fetch("https://api.football-data.org/v2/competitions", {method: 'GET', headers: myHeaders})
        .then(res => res.json())
        .then(
            (result) =>{
                this.setState({
                    isLoaded: true,
                    competitions: result.competitions
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
        let {error, isLoaded, competitions} = this.state
        const myCompetitions = competitions.filter(competition => freeCompetitions.includes(competition.name))
        if(error){
            return(
                <div className="listOfLeagues error container">
                    <h>Error {error.message}</h>
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
            <div className="listOfLeagues container">
                <div className="listOfLeagues-title">
                    <h1>Наши футбольные лиги</h1>
                    <hr></hr>
                </div>
                <div className="listOfLeagues-list row align-items-start">
                    <div className="competitions-name col">
                        <div className="competitions-name-title">
                            <h3>Название лиги</h3>
                        </div>
                        <div className="competition-name-body">
                            <ul>
                                {myCompetitions.map(competition => (
                                    <li key={competition.id}>
                                        <a href={`/competitions/${competition.id}`}>{competition.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>  
                    <div className="competitions-country col">
                        <div className="competitions-country-title">
                            <h3>Страна проведения</h3>
                        </div>
                        <div className="competitions-country-body">
                            <ul>
                                {myCompetitions.map(competition => (
                                    <li key={competition.id}>
                                        {competition.area.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>   
                    <div className="competitions-dates col">
                        <div className="competitions-dates-title">
                            <h3>Даты проведения</h3>
                        </div>
                        <div className="competitions-dates-body">
                            <ul>
                                {myCompetitions.map(competition => (
                                    <li key={competition.id}>
                                        {competition.currentSeason.startDate} - {competition.currentSeason.endDate}
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

