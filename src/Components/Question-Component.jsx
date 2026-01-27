const QuestionComponent = (props)=>{
    return(
        <>
            <div className="compnent-div">
                    <p>Question: {props.questionNumber}</p>
                    <textarea></textarea>
                    <div className='teacher-option-box'>
                        <div>
                            <p>OPTION: A</p>
                            <input className="option-a" type="text" />
                        </div>
                        <div>
                            <p>OPTION: B</p>
                            <input className="option-b" type="text" />
                        </div>
                        <div>
                            <p>OPTION: C</p>
                            <input className="option-c" type="text" />
                        </div>
                        <div>
                            <p>OPTION: D</p>
                            <input className="option-d" type="text" />
                        </div>
                    </div>
                    <div className='teacher-correct-answer'>
                        <p>CORRECT ANSWER</p>
                        <input className="correct-answer" type='text' />
                    </div>
                </div>
        </>
    )
}

export default QuestionComponent