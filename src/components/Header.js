import React from 'react'

export default function Header() {
    return (
        <div className="header">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" href="/">SoccerStat</a>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="/competitions">Лиги</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/teams">Команды</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
