import React from 'react';
import classes from './FinishedQuiz.module.scss'

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }

        return total
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {
                    props.quiz.map((quizItem, index) => {
                            const cls = ['fa', props.results[quizItem.id]]

                            return (
                                <li>
                                    <strong>{++index}. </strong>
                                    {quizItem.question}
                                    <i className={cls.join(' ')}></i>
                                </li>
                            )
                        }
                    )
                }
            </ul>

            <p>Right answer {successCount} on {props.quiz.length}</p>

            <div>
                <button onClick={props.onRetry}>Replay</button>
            </div>
        </div>
    );
};

export default FinishedQuiz;
