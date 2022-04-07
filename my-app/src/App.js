import React, { useState, useEffect } from "react"
import IntroPage from "./intropage.js"
import Question from "./questions.js"
import Answers from "./answers.js"
import { nanoid } from "nanoid"

function App() {

  const [StartGame, setStartGame] = useState(false)

  const [questions, setQuestions] = useState([])

  const [answerCheck, setAnswerCheck] = useState(false)

  const [resetGame, setResetGame] = useState(true)

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => {
        const questions = data.results.map(res => {

          const answers = res.incorrect_answers.concat(res.correct_answer)

          function scoreValue() {
            if (res.difficulty === "easy") {
              return 1
            } else if (res.difficulty === "medium") {
              return 2
            } else if (res.difficulty === "hard") {
              return 3
            }
          }

          const answersArr = answers.map(a => {
            return ({
              answer: a,
              isSelected: false,
              isCorrect: a === res.correct_answer ? true : false,
              id: { nanoid }
            })
          })

          return ({
            question: res.question,
            answers: shuffle(answersArr),
            category: res.category,
            difficulty: res.difficulty,
            scoreValue: scoreValue(),
            id: { nanoid }
          })
        })
        setQuestions(questions)
      })

  }, [resetGame])

  function answerSelected(aid, qid) {

    setQuestions(oldQuestions => oldQuestions.map(q => {

      function setAnswer(){
        
        if(q.id === qid){
          return(
            q.answers.map(a => {
              return a.id === aid ? 
              {...a, isSelected: !a.isSelected} :
              {...a, isSelected: false}
            })
          )
        }else{
          return q.answers
        }
      }

      function scoreValue() {
        if (q.difficulty === "easy") {
          return 1
        } else if (q.difficulty === "medium") {
          return 2
        } else if (q.difficulty === "hard") {
          return 3
        }
      }

      return ({
        question: q.question,
        answers: setAnswer(),
        category: q.category,
        difficulty: q.difficulty,
        scoreValue: scoreValue(),
        id: { nanoid }
      })

    }))
  }

  function beginGame() {
    setStartGame(true)
  }

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
  }

  function checkAnswers() {
    setAnswerCheck(true)
  }

  function getScore() {

    let totalPossibleScore = 0
    let playerScore = 0

    for (let q of questions) {

      totalPossibleScore += q.scoreValue

      for (let a of q.answers) {

        if (a.isSelected && a.isCorrect) {

          playerScore += q.scoreValue

        }
      }
    }

    return `Score: ${playerScore} / ${totalPossibleScore}`
  }

  function setGame() {
    setResetGame(!resetGame)
    setStartGame(false)
    setAnswerCheck(false)
  }

  const displayTrivia = questions.map(q => {

    return (

      <>
        <Question
          key={q.question}
          question={q.question}
          category={q.category}
          difficulty={q.difficulty}
        />

        <div className="answer-button-container">
          {q.answers.map(a => {
            return (
              <Answers
                answer={a.answer}
                aid={a.id}
                qid={q.id}
                selected={a.isSelected}
                selectAnswer={answerSelected}
                answerCheck={answerCheck}
                isCorrect={a.isCorrect}
              />
            )
          })}
        </div>

        <hr className="divider" />

      </>

    )

  })

  return (

    <div className="container">
      {
        StartGame

          ?

          <>
            {displayTrivia}

            {answerCheck && <h2 className="score" >{getScore()}</h2>}

            <button className="check-answers-button" onClick={answerCheck ? setGame : checkAnswers}>{answerCheck ? "New Game" : "Check Answers"}</button>
          </>

          :

          <IntroPage
            startGame={beginGame}

          />
      }

    </div>

  );
}

export default App;

