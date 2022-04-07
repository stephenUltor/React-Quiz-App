import React, {useState} from "react"
import {decode} from "html-entities"

export default function Quiz(props){

    return(
        <div className="quiz-question-container">

            <div className="quiz-question-info-container">
                <p className="quiz-question-info">Category: {props.category}</p>
                <p className="quiz-question-info">Difficulty: {props.difficulty}</p>
            </div>
            
            <p className="quiz-question">{decode(props.question)}</p>
        </div>
    )
}





