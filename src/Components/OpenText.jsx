import Header from '../Components/Header'
import '../Styles/OpenTest.css';
import Question from './QuestionComponenet';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const OpenTest = () => {
    const location = useLocation();
    const [question, setQuestion] = useState([]);
    const data = location.state.questionBank;
    const navigate = useNavigate();
    const [submitOption, setSubmitOption] = useState([]);
    const api = import.meta.env.VITE_APP_URL;
    const token = localStorage.getItem("token");
    const testOtp = location.state.otp;

    const handleOnChooseOption = (selectedOption, correctAnswer, questionNo) => {
        try {
            for (let i of submitOption) {
                if (i[2] === questionNo) {
                    i[0] = selectedOption;
                    return;
                }
            }
            setSubmitOption([...submitOption, [selectedOption, correctAnswer, questionNo]]);
        } catch (err) {
            console.log(err);
            console.log("This error is coming from handleOnFinsishTest route and from OpenTest.jsx file");
        }
    };

    const handleOnFinsihTest = async () => {
        try {
            document.querySelector('.finished-message').style.display = "block";
            document.body.style.overflow = "hidden";

            const date = currentDate();


            let correctMarks = await calulateCorrect();
            let totalMarks = submitOption.length;
            const response = await axios.post(`${api}/student/finishedtest`, { token, correctMarks, totalMarks, testOtp, date });
            if (response.data.success) {
                toast.success(response.data.message);
            }
            console.log(response.data.message);
        } catch (err) {
            console.log(err);
            console.log("This error is coming from handleOnFinishTest and from OpenTest.jsx file and from line no 43");
        }
    };

    const calulateCorrect = () => {
        try {
            let correct = 0;
            for (let i of submitOption) {
                if (i[0].toLowerCase() === i[1].toLowerCase()) {
                    correct += 1;
                }
            }
            return correct;
        } catch (err) {
            console.log(err);
            console.log("This error is coming from calculateCorrect method and from openTest.jsx file");
        }
    };

    const handleOnExist = () => {
        navigate('/student', { replace: true });
    };

    const backToHome = () => {
        navigate('/student', { replace: true });
        document.querySelector('.finished-message').style.display = "none";
        document.body.style.overflow = "auto";
    };

    const currentDate = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        return  mm + '/' + dd + '/' + yyyy;
    }

    useEffect(() => {
        setQuestion(data);
        const handleFullChange = () => {
            if (!document.fullscreenElement) {
                console.log("User exited fullscreen");
                toast.warning("You are Blocked.");
                setTimeout(() => {
                    navigate('/student', { replace: true });
                }, 1000);
            } else {
                console.log("Entered fullscreen");
            }
        };
        document.addEventListener("fullscreenchange", handleFullChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullChange);
        };
    }, []);

    return (
        <>
            <ToastContainer />
            <Header />
            <main className='open-test-main'>
                {
                    question.map((item, index) => (
                        <div key={index}>
                            <Question setMethod={handleOnChooseOption} number={index + 1} question={item.Question} optionA={item.optionA} optionB={item.optionB} optionC={item.optionC} optionD={item.optionD} correctAnswer={item.correctAnswer} />
                        </div>
                    ))
                }
            </main>
            <div className='bottom-nav'>
                <div>
                    <button onClick={handleOnFinsihTest} className='first'>Finish Test</button>
                </div>
                <button onClick={handleOnExist} className='second'>Exist</button>
            </div>

            <div className='finished-message'>
                <div>
                    <button onClick={backToHome}>Back to Home</button>
                </div>
            </div>
        </>
    )
}

export default OpenTest;