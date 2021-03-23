import React, { createContext, ReactNode, useEffect, useState } from 'react'

interface QuestionContextProps {
    theNumber: number
    currentQuestion: Question
    hasFound: boolean
    switchRange: (operator: string) => void
    changeQuestion: () => void
    getQuestionAnswer: (questionId: number, answer: number) => Promise<void>
}

interface QuestionProviderProps {
    children: ReactNode
}

export interface Question {
    id: number
    text: string
    value: number,
    passed?: boolean
}

export const QuestionContext = createContext<QuestionContextProps>({} as QuestionContextProps)

export default function QuestionProvider({ children }: QuestionProviderProps) {
    const [theNumber, setTheNumber] = useState(1) // Controls and sets the guessing number
    const [questionCtrl, setQuestionCtrl] = useState(0  ) // Control the current question index
    const [start, setStart] = useState(1) // Control the start range to search
    const [end, setEnd] = useState(8000) // Control the end range to search
    const [lastWasNormal, setLasWasNormal] = useState(true)

    const [hasFound, setHasFound] = useState(false) // Controls if we find out the wish number or not

    const questions: Array<Question> = [
        {
            text: "Qual a soma dos algarismos?",
            value: -1,
            id: 1,
            passed: false
        },
        {
            text: "Qual o resto do número por 7?",
            value: -1,
            id: 2,
            passed: false
        },
        {
            text: "Qual o produto dos algarismos?",
            value: -1,
            id: 3,
            passed: false
        },
        {
            text: "O número pensado é maior, igual ou menor que,",
            value: 0,
            id: 0
        }
    ]
    const [currentQuestion, setCurrentQuestion] = useState<Question>(questions[0])

    function isPrimeNumber(n: number) {
        return ((n % 2 !== 0)
            && (n % 3 !== 0)
            && (n % 5 !== 0)
            && (n % 7 !== 0))
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

    async function getQuestionAnswer(questionId: number, answer: number) {
        questions[questionId].value = answer
        questions[questionId].passed = true
        updateTheNumber(answer)
    }

    async function getTheNumber(questionId: number, answer?: number) {
        switch (questionId) {
            case 1: // When the user answer the first question this is called
                for (let i = start; i <= end; i++) {
                    if (isPrimeNumber(i)) {
                        if (digitsSum(i, ((answer) ? answer : 0))) {
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
                        if (digitsProduct(i, ((answer) ? answer : 0))) {
                            return i
                        }
                    }
                }
                return 0
            default:
                return theNumber
        }
    }

    function switchRange(operator: string) {
        console.log("switchRange "+theNumber)
        switch (operator) {
            case ">": // If the wished number is highier than the guessed starts the search, before the guessed one
                setStart(theNumber + 1)
                break
            case "<": // If the wished number is lower than the guessed starts the search, after the guessed one
                setEnd(theNumber - 1)
                break
            case "=": // Ends the application
                setHasFound(true)
                break
            default:
                break
        }

        changeQuestion()
    }

    function setNewQuestionCtrl(oldQuestionIndex: number) {
        if (oldQuestionIndex + 1 > 2) {
            setQuestionCtrl(0)
        } else {
            setQuestionCtrl(oldQuestionIndex+1)
        }
    }

    async function changeQuestion() {
        if (lastWasNormal) {
            setNewQuestionCtrl(questionCtrl)
        } else {
            setCurrentQuestion(questions[3])
        }
        setLasWasNormal(!lastWasNormal)
    }

    async function updateTheNumber(answer?: number) {
        setTheNumber(await getTheNumber(questionCtrl, answer))
    }

    useEffect(() => {
        setCurrentQuestion(questions[questionCtrl])
        updateTheNumber()
        console.log(theNumber)
        console.log(questionCtrl)
    }, [questionCtrl, theNumber])

    return (
        <QuestionContext.Provider
            value={{
                theNumber,
                currentQuestion,
                hasFound,
                switchRange,
                changeQuestion,
                getQuestionAnswer
            }}
        >
            {children}
        </QuestionContext.Provider>
    )
}