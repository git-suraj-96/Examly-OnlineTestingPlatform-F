import '../Styles/Teacher.set.question.css';
import Header from './Header';
import QuestionComponent from './Question-Component';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';

const TeacherSetQuestion = () => {
    const [questionBox, addQuestionBox] = useState([]);
    const [count, setCount] = useState(0);
    const questionBoxRef = useRef(null);
    const [questionBank, setQuestionBank] = useState([]);
    const api = import.meta.env.VITE_APP_URL;
    const [questionTopic, setQuestionTopic] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const submitBody = useRef(null);

    const handleOnAddNew = () => {
        setCount(count + 1);
        if (count === 0) return;
        setQuestionArray();
    }

    const handleOnCompleted = () => {
        if(count === 0) return;
        if(questionTopic === "") return toast.warn("All fields are required.");
        try{
            setQuestionArray();
            submitBody.current.style.display = "block";
            document.body.style.overflow = "hidden";

        }catch(err){
            console.log(err.message);
            console.log("This error is coming from HandleOnCompleted method and from Teacher.SetQuestion file...");
        }
    }

    const handleOnSubmit = async () => {
        if (count === 0) return;
        try {
            if(questionTopic === "") return toast.warn("All fields are required.");
            const response = await axios.post(`${api}/teacher/setquestion`, { questionBank, questionTopic, token});
            if(response.data.success){
                console.log(response.data);      
                toast.success("Question set successfully.")          
            }else if(response.data.success === false && response.data.message === "jwt expired") {
                console.log(response.data.message)
                return navigate('/login')
            };
            setTimeout(()=>{
                document.body.style.overflow = "auto";
                navigate('/teacher');
            }, 2000);
        } catch (err) {
            console.log(err);
        }

    }

    const setQuestionArray = () => {
        let parentChild = questionBoxRef.current;
        let questionObj = {};

        let question = parentChild.querySelector("textarea").value;
        if(question === "") return;
        questionObj.Question = question;

        let optionA = parentChild.querySelector(".option-a").value;
        questionObj.optionA = optionA;

        let optionB = parentChild.querySelector(".option-b").value;
        questionObj.optionB = optionB;

        let optionC = parentChild.querySelector(".option-c").value;
        questionObj.optionC = optionC;

        let optionD = parentChild.querySelector(".option-d").value;
        questionObj.optionD = optionD;

        let correctAnswer = parentChild.querySelector(".correct-answer").value;
        questionObj.correctAnswer = correctAnswer;

        setQuestionBank([...questionBank, questionObj]);
        questionObj = {};
    }

    useEffect(() => {
        if (count === 0) return;
        addQuestionBox([...questionBox, count]);
    }, [count]);

    return (
        <>
            <ToastContainer/>
            <Header />
            <main className='teacher-main'>
                <div className='test-topic-div'>               
                     <label htmlFor='testtopic'>Test Topic*</label>
                    <input value={questionTopic} onChange={(e) => setQuestionTopic(e.target.value)} name='testtopic' id='testtopic' className='set-question-topic' type="text" placeholder='Enter your test topic...' />
                </div>

                <div >
                    {
                        questionBox.map((item, index) => (
                            <div ref={questionBoxRef} key={index} >
                                <QuestionComponent questionNumber={item} />
                            </div>
                        ))
                    }
                </div>
                <div className='teacher-btns'>
                    <button className='teacher-add-new-btn' onClick={handleOnAddNew} >+ Add Question</button>
                    <button className='teacher-add-new-btn' onClick={handleOnCompleted} >Completed</button>
                </div>
                <div className='submit-body' ref={submitBody} style={{display: "none"}}>
                    <div className='submit-btn-main-container'>
                        <div  className='set-question-submit-button-box'>
                            <h4>Click on Submit Button</h4>
                            <button onClick={handleOnSubmit}>Submit</button>
                        </div>
                    </div>
                 </div>
            </main>
        </>
    )
}

export default TeacherSetQuestion;