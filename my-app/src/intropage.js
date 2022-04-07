import React from "react"

export default function introPage(props) {
    return(
        <div className="intro-page">
            <h1 className="title">Quizzical</h1>
            <p className="title-description">
                The Quiz App!
                <br/><br/>
                The more difficlt the question, 
                <br/>the higher the points!
            </p>
            <button className="start-quiz-button" 
                onClick = {props.startGame}>Start Quiz</button>
        </div>
    )
}