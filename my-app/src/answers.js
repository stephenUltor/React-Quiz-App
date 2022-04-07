import React from "react"
import {decode} from "html-entities"

export default function Answers(props){

    function determineStyles(){
        
        if(props.answerCheck){
            if(props.isCorrect){
                return "answer-button-isCorrect"
            }else if(props.selected && props.isCorrect === false){
                return "answer-button-isNotCorrect"
            }else if(props.selected === false){
                return "answer-button-unselected-answerCheck"
            }else if(props.selected === false && props.isCorrect){
                return "answer-button-isCorrect"
            }
        }else if(props.answerCheck === false){
            if(props.selected){
                return "answer-button-selected"
            }else{
                return "answer-button-unselected"
            }
        }
    }
    
    return(
        <>
        <button className={determineStyles()} onClick={() => props.selectAnswer(props.aid, props.qid)}>{decode(props.answer)}</button>
        </>
    )
}
