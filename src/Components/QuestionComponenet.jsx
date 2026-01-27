import { useState } from 'react';
import '../Styles/OpenTest.css';

const Question = (props) => {
    const [selected, setSelected] = useState("");
    
    const handleOnOptionClick = (select) =>{
        setSelected(select);
    }


    return(
        <div className='question-componenet'>
            <div className='question-box'>
                <span>{props.number}.</span>
                <h2 className='question'>{props.question}</h2>
            </div>

            <div className='question-comp-option-box'>
                <button className={selected === "optionA" ? "green" : "white"} onClick={()=>{props.setMethod(props.optionA, props.correctAnswer, props.number), handleOnOptionClick("optionA")}}>{props.optionA}</button>
                <button className={selected === "optionB" ? "green" : "white"} onClick={()=>{props.setMethod(props.optionB, props.correctAnswer, props.number), handleOnOptionClick("optionB")}}>{props.optionB}</button>
                <button className={selected === "optionC" ? "green" : "white"} onClick={()=>{props.setMethod(props.optionC, props.correctAnswer, props.number), handleOnOptionClick("optionC")}}>{props.optionC}</button>
                <button className={selected === "optionD" ? "green" : "white"} onClick={()=>{props.setMethod(props.optionD, props.correctAnswer, props.number), handleOnOptionClick("optionD")}}>{props.optionD}</button>
            </div>
        </div>
    )
}

export default Question;