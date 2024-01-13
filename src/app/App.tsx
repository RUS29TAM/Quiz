import React, {useEffect, useState} from 'react';
import style from './app.module.css';
//---------------------
interface AnswerOption {
    response: string;
    correct: boolean;
    selected: boolean; // Добавленное свойство
}

interface Question {
    question: string;
    options: AnswerOption[];
    correct: string;
}

interface PlayerAnswer {
    que: string;
    res: string;
    correct: boolean;
    qNum: number;
}


const qa: Question[] = [
    {
        question: "Вопрос №1 - знаете ли вы JavaScrypt?",
        correct: "Да",
        options: [
            {response: "нет", correct: false, selected: false},
            {response: "сомневаюсь", correct: false, selected: false},
            {response: "возможно", correct: false, selected: false},
            {response: "затрудняяюсь ответить", correct: false, selected: false},
            {response: "да", correct: true, selected: false},
        ],
    },
    {
        question: "Вопрос №2 - вы честно ответили на предыдущий вопрос?",
        correct: "нет",
        options: [
            {response: "сомневаюсь", correct: false, selected: false},
            {response: "затрудняюсь ответить", correct: false, selected: false},
            {response: "возможно", correct: false, selected: false},
            {response: "да", correct: false, selected: false},
            {response: "нет", correct: true, selected: false},
        ],
    },
    // ... Добавьте остальные вопросы
];

const App: React.FC = () => {

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [playerAnswers, setPlayerAnswers] = useState<PlayerAnswer[]>([]);


    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = () => {
        const updatedQuestions = qa.map((q) => ({
            ...q,
            options: q.options.map((opt) => ({...opt, selected: false})),
        }));
        setQuestions(updatedQuestions);
    };

    const handleAnswerClick = (optionIndex: number) => {
        const updatedQuestions = [...questions];
        const selectedOption = updatedQuestions[currentQuestionIndex].options[optionIndex];

        if (!selectedOption.selected) {
            selectedOption.selected = true;

            if (selectedOption.correct) {
                setScore(score + 1);
                console.log('Верно');


            } else {
                console.log('Не верно!')
            }

            const playerAnswer: PlayerAnswer = {
                que: questions[currentQuestionIndex].question,
                res: selectedOption.response,
                correct: selectedOption.correct,
                qNum: currentQuestionIndex + 1,
            };

            setPlayerAnswers((prevAnswers) => [playerAnswer, ...prevAnswers]);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        if (currentQuestionIndex >= questions.length) {
            console.log('показать результат')
        }
    };

    const showResults = () => {
        // Логика для отображения результатов

        console.log('Player Answers:', playerAnswers);
        console.log('показать результат')
        // Ваша дополнительная логика здесь
    };



    return (
        <div className={style.container}>
            <div className={style.form_c}>
                <div className={style.qa}>
                    <div className={style.q}>
                        <h3 className={style.q_item}>{questions[currentQuestionIndex]?.question}</h3>
                    </div>
                    <div className={style.a}>
                        {questions[currentQuestionIndex]?.options.map((option, index) => (
                            <div
                                key={index}
                                className={`${option.selected && option.correct ? style.selected : option.selected && !option.correct ? style.incorrecr : style.a_item}`}
                                onClick={() => handleAnswerClick(index)}
                            >
                                {option.response}
                            </div>
                        ))}
                        {currentQuestionIndex === questions.length - 1 ?
                            <div className={style.a_item ? style.start_game : style.start_game2}
                                 onClick={showResults}>
                                Показать результат
                            </div>
                        :
                        <div className={style.a_item ? style.start_game : style.start_game2}
                             onClick={handleNextQuestion}>
                            Следующий вопрос
                        </div>
                        }
                    </div>
                </div>
                <div className={style.progressBar}>
                    {/* Ваша логика для отображения прогресса и кнопки "Next Question" */}
                    <div className={style.bar}>
                        <div className={style.bar_w}
                             style={{width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`}}></div>
                    </div>
                </div>
            </div>
        </div>

    );
};


export default App;
