import React from 'react'

import ActionButton from '../components/ActionButton'

function Dashboard() {
    return (
        <div className="container">
            <header>
                <h1>GuessNum</h1>
            </header>

            <main>
                <div className="question">
                    <span>{1}</span>
                </div>
                <div className="number">
                    <span>{0}</span>
                </div>
                <div className="interaction">
                    <ActionButton text="Maior >" key={1} />
                    <ActionButton text="Igual =" key={2} />
                    <ActionButton text="Menor <" key={3} />
                </div>
            </main>
        </div>
    )
}

export default Dashboard