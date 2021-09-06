import React from 'react'
import './styles/mainPage.css'

export default function MainPage() {
    return (
        <div className="container main-page">
            <div className="main-page-title">
                <h1>Добро пожаловать на наш сайт SoccerStat!</h1>  
            </div>
            <div className="main-page-description">
                <h2>Здесь вы сможете посмотреть статистику ведущих европейских турниров по футболу!</h2>    
            </div>
            <div className="main-page-body">
                <div className="main-page-body-item">
                    <h4>Чтобы просмотреть все футбольные лиги перейдите на страницу <a href="/competitions">футбольные лиги</a>.</h4>
                </div>
                <div className="main-page-body-item">
                    <h4>Для того, чтобы просмотреть все команды перейдите на страницу <a href="/teams">список команд</a>.</h4>
                </div>
            </div>
        </div>
    )
}
