import React, { createContext, ReactNode, useState } from 'react'

interface QuestionContextProps {
    theNumber: number
    currentQuestion: Question
    getQuestionAnswer: (questionId: number, answer: number) => void
    swithRange: (operator: string) => void
}

interface QuestionProviderProps {
    children: ReactNode
}

interface Question {
    id: number
    text: string
    value: number
}

export const QuestionContext = createContext<QuestionContextProps>({} as QuestionContextProps)

export default function QuestionProvider({ children }: QuestionProviderProps) {
    const [theNumber, setTheNumber] = useState(1)
    const [checks, setChecks] = useState(1)
    const [star, setStart] = useState(1)
    const [end, setEnd] = useState(8000)

    const questions: Array<Question> = [
        {
            text: "Qual a soma dos algarismos?",
            value: -1,
            id: 1
        },
        {
            text: "Qual o resto do número por 7?",
            value: -1,
            id: 2
        },
        {
            text: "Qual o produto dos algarismos?",
            value: -1,
            id: 3
        },
        {
            text: "Nosso chute é maior, menor ou igual ao número que você pensou?",
            value: 0,
            id: 0
        }
    ]
    const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0])
    const [lastQuestion, setLastQuestion] = useState<Question>(questions[0])

    async function getQuestionAnswer(questionId: number, answer: number) {
        questions[questionId].value = answer
        setLastQuestion(questions[questionId])
        setChecks(checks+1)
        setTheNumber(await getTheNumber(questionId))
        setCurrentQuestion(questions[3])
    }

    function isPrimeNumber(n: number) {
        return (   (n % 2 !== 0)
                && (n % 3 !== 0)
                && (n % 5 !== 0)
                && (n % 7 !== 0))
    }

    async function getTheNumber(questionId: number) {
        switch (questionId) {
            case 1:
                for (let i = star; i <= end; i++) {
                    if (isPrimeNumber(i)) {
                        if (sumAlgs(i, questions[questionId].value)) {
                            return i
                        }
                    }
                }
                return 0
            case 2:
                for (let i = star; i <= end; i++) {
                    if (isPrimeNumber(i)) {
                        if (perSeven(i)) {
                            return i
                        }
                    }
                }
                return 0
            case 3:
                for (let i = star; i <= end; i++) {
                    if (isPrimeNumber(i)) {
                        if (productAlgs(i, questions[questionId].value)) {
                            return i
                        }
                    }
                }
                return 0
            default:
                for (let i = star; i <= end; i++) {
                    if (isPrimeNumber(i)) {
                        if (sumAlgs(i, questions[questionId].value)) {
                            return i
                        }
                    }
                }
                return 0

        }
    }

    function perSeven(alg: number) {
        if (alg % 7 === 1) return true
        return false 
    }

    function productAlgs(alg: number, value: number) {
        let prod = 1

        while (alg !== 0) {
            let n = Math.floor(alg % 10)
            if (n !== 0) prod *= n
            alg = Math.floor(alg / 10)
        }

        return prod === value
    }

    function sumAlgs(alg: number, value: number) {
        let sum = 0

        while (alg !== 0) {
            sum += Math.floor(alg % 10)
            alg = Math.floor(alg / 10)
        }

        return sum === value
    }

    function swithRange(operator: string) {
        switch (operator) {
            case ">":
                setStart(lastQuestion.value+1)
            break
            case "<":
                setEnd(lastQuestion.value-1)
            break
            case "=":
            break
            default:
            break
        }
    }

    return (
        <QuestionContext.Provider
            value={{
                theNumber,
                currentQuestion,
                getQuestionAnswer,
                swithRange
            }}
        >
            {children}
        </QuestionContext.Provider>
    )
}