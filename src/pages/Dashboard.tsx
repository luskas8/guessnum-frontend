import React, { useContext } from 'react'

import { QuestionContext } from '../contexts/QuestionContext'

import ActionButton from '../components/ActionButton'
import Question from '../components/Question'


function Dashboard() {
    const { theNumber, currentQuestion, hasFound } = useContext(QuestionContext)

    return (
        <div className="container">
            <header>
                <h1>GuessNum</h1>
            </header>

            <main>
                {
                    hasFound ? (
                        <h1>Número achado!</h1>
                    ) : (
                        <>
                            <Question question={currentQuestion} />
                            {
                                (currentQuestion.id === 0) && (
                                    <>
                                        <div className="number">
                                            nosso chute? <span>{theNumber}</span>
                                        </div>
                                        <div className="interaction">
                                            <ActionButton text="Maior >" key={1} value=">" />
                                            <ActionButton text="Igual =" key={2} value="=" />
                                            <ActionButton text="Menor <" key={3} value="<" />
                                        </div>
                                    </>
                                )
                            }
                        </>
                    )
                }
            </main>
        </div>
    )
}

export default Dashboard