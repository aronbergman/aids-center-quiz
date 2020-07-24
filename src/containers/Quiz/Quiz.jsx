import React, {Component} from 'react';
import classes from './Quiz.module.scss'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results: {}, // {[id]: 'success' or 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' or 'error'}
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                answers: [
                    {text: 'Черный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зелёный', id: 4}
                ],
                rightAnswerId: 2,
            },
            {
                id: 2,
                question: 'В каком году основан Санкт-Петербург?',
                answers: [
                    {text: '1700', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4}
                ],
                rightAnswerId: 3,
            }
        ]
    }

    onAnswerClickHandler = answerId => {

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return true
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[answerId]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })
            const timeout = setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    results[question.id] = 'error'
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                        results: results
                    });
                }
                clearTimeout(timeout)
            }, 1000)

        } else {

            this.setState({
                answerState: {[question.id]: 'error'}
            })
        }
    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    onRetryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Заголовок теста</h1>
                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.onRetryHandler}
                            />
                            : <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                </div>
            </div>
        );
    }
}

export default Quiz;