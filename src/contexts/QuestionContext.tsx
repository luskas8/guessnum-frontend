import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface QuestionContextProps {
    theNumber: number
    currentQuestion: Question
    hasFound: boolean
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
    const [theNumber, setTheNumber] = useState(1) // Controls and sets the guessing number
    const [questionCtrl, setQuestionCtrl] = useState(1) // Control the current question index
    const [start, setStart] = useState(1) // Control the start range to search
    const [end, setEnd] = useState(8000) // Control the end range to search

    const [hasFound, setHasFound] = useState(false) // Controls if we find out the wish number or not

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
            text: "O número pensado é maior, igual ou menor que,",
            value: 0,
            id: 0
        }
    ]
    const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0])
    const [lastNumber, setLastNumber] = useState(0)

    async function getQuestionAnswer(questionId: number, answer: number) {
        questions[questionId].value = answer // Sets the questio's tip given by the user
        if (questionCtrl+1 === 4) {
            setQuestionCtrl(0)
        } else {
            setQuestionCtrl(questionCtrl+1) // Increase the amount of entries
        }
        setTheNumber(await getTheNumber(questionId)) // Get the guess number
        setLastNumber(theNumber)
        setCurrentQuestion(questions[3]) // Set the next question for the default question
    }

    function isPrimeNumber(n: number) {
        return (   (n % 2 !== 0)
                && (n % 3 !== 0)
                && (n % 5 !== 0)
                && (n % 7 !== 0))
    }

    async function getTheNumber(questionId: number) {
        switch (questionId) {
            case 1: // When the user answer the first question this is called
                for (let i = start; i <= end; i++) {
                    if (isPrimeNumber(i)) {
                        if (digitsSum(i, questions[0].value)) {
                            return i
                        }
                    }
                }
                return 0
            case 2: // When the user answer the second question this is called
                for (let i = start; i <= end; i++) {
                    if (isPrimeNumber(i)) {
                        if (perSeven(i)) {
                            return i
                        }
                    }
                }
                return 0
            case 3: // When the user answer the third question this is called
                for (let i = start; i <= end; i++) {
                    if (isPrimeNumber(i)) {
                        if (digitsProduct(i, questions[2].value)) {
                            return i
                        }
                    }
                }
                return 0
            default: // When the user answer the default question this is called
                for (let i = start; i <= end; i++) {
                    if (isPrimeNumber(i)) {
                        if (digitsSum(i, questions[0].value)) {
                            return i
                        }
                    }
                }
                return 0
        }
    }

    // This function gives if the alg is divisible per sever or not
    async function perSeven(alg: number) {
        if (alg % 7 === 1) return true
        return false 
    }

    // This function gives if the product of the alg digits if equal to given value
    async function digitsProduct(alg: number, value: number) {
        let prod = 1

        while (alg !== 0) {
            let n = Math.floor(alg % 10)
            if (n !== 0) prod *= n
            alg = Math.floor(alg / 10)
        }

        return prod === value
    }

    // This function says if the sum of the alg digits 
    async function digitsSum(alg: number, value: number) {
        let sum = 0

        while (alg !== 0) {
            sum += Math.floor(alg % 10)
            alg = Math.floor(alg / 10)
        }

        return sum === value
    }

    async function swithRange(operator: string) {
        switch (operator) {
            case ">": // If the wish number is highier than the guessed starts the search, before then
                setStart(lastNumber+1)
            break
            case "<": // If the wish number is lower than the guessed starts the search, after then
                setEnd(lastNumber-1)
            break
            case "=": // Ends the application
                setHasFound(true)
            break
            default:
            break
        }
        if (!hasFound) {
            setTheNumber(await getTheNumber(0))
            setLastNumber(theNumber)
            if (questionCtrl < 4) {
                setCurrentQuestion(questions[questionCtrl-1])
            } else {
                setCurrentQuestion(questions[3])
            }
            if (questionCtrl+1 === 4) {
                setQuestionCtrl(0)
            } else {
                setQuestionCtrl(questionCtrl+1) // Increase the amount of entries
            }
        }
    }

    useEffect(() => {
        console.log(start)
        console.log(end)
    }, [start, end])

    return (
        <QuestionContext.Provider
            value={{
                theNumber,
                currentQuestion,
                hasFound,
                getQuestionAnswer,
                swithRange
            }}
        >
            {children}
        </QuestionContext.Provider>
    )
}