import React, { createContext, ReactNode, useState } from 'react'

interface QuestionContextProps {
    sortQuestion: () => Question | null
}

interface QuestionProviderProps {
    children: ReactNode
}

export interface Question {
    question: string
    value: number
}

export const QuestionContext = createContext<QuestionContextProps>({} as QuestionContextProps)

function QuestionProvider({ children }: QuestionProviderProps) {
    const [checks, setChecks] = useState(0)
    const questions: Array<Question> = [
        {
            question: "Qual a soma dos algarismos?",
            value: 0
        },
        {
            question: "Qual o resto do número por 7?",
            value: 0
        },
        {
            question: "Qual o produto dos algarismos?",
            value: 0
        }
    ]

    function sortQuestion() {
        if (questions.length) {
            let question = questions[0]
            questions.slice(0, 1)
            setChecks(checks+1)
            return question
        }

        return null
    }

    return (
        <QuestionContext.Provider 
            value={{
                sortQuestion
            }}
        >
            {children}
        </QuestionContext.Provider>
    )
}

export default QuestionProvider