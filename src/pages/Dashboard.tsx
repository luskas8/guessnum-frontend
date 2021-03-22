import React, { useContext, useEffect, useState } from 'react'

import ActionButton from '../components/ActionButton'
import { QuestionContext, Question } from '../contexts/QuestionContext'

function Dashboard() {
    const { sortQuestion } = useContext(QuestionContext)
    const defaultQuestion: Question = {
        question: "O número é maior menor ou igual ao que pensou?",
        value: 0
    }

    const [question, setQuestion] = useState<Question>(defaultQuestion)
    const [isQuestionDefauld, setIsQuestionDefault] = useState(false)
    useEffect(() => {
        let question: Question | null = sortQuestion()
        console.log(question)

        if (question != null) {
            setQuestion(question)
            setIsQuestionDefault(false)
        } else {
            setQuestion(defaultQuestion)
            setIsQuestionDefault(true)
        }
    }, [])


    return (
        <div className="container">
            <header>
                <h1>GuessNum</h1>
            </header>

            <main>
                <div className="question">
                    <span>{question.question}</span>
                </div>
                {
                    !isQuestionDefauld && (
                        <div className="input-block">
                            <input type="number" name="resposta"/>
                        </div>
                    )
                }
                <div className="number">
                    Nosso chute: <span>{0}</span>
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