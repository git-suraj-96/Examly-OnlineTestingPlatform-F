import Header from "./Header";
import "../Styles/StudentPage.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';

const StudentPage = () => {
  const navigate = useNavigate();
  const api = import.meta.env.VITE_APP_URL;
  const token = localStorage.getItem("token");
  const [questionData, setQuestionData] = useState([]);
  const [currentTestOtp, setCurrentTestOtp] = useState(null);
  const otpBox = useRef(null);
  const [selectedTestQuestion, setselectedTestQuestion] = useState([]);

  const getFullScreen = () => {
    try {
      let element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    } catch (err) {
      console.log(err);
      console.log(
        "This error is coming from GetFullScreent method and from StudentPage.jsx file",
      );
    }
  };

  const showVerifyBox = (otp, question) => {
    document.querySelector('.verify-otp').style.display = "block";
    setCurrentTestOtp(otp);
    setselectedTestQuestion(question);
  }

  const hideVerifyBox = () => {
    document.querySelector('.verify-otp').style.display = "none";
  }

  const getOtp = async() =>{
    try{
      const res = await axios.post(`${api}/student/getOtp`, {token});
      if(res.data.success){
        setQuestionData(res.data.message);
      }
    }catch(err){
      console.log(err);
      console.log("This error is coming frim getOtp method and from student.page file and from line no:31");
    }
  }

  const verifyOtp = () => {
    try{
      if(!otpBox.current.value) return toast.error("OTP Required");
      if(otpBox.current.value == (currentTestOtp)){
        toast.success("OTP Verified Successfully.");
        setTimeout(() => {
          getFullScreen();
          navigate('/student/opentest', {state: {questionBank: selectedTestQuestion, otp: currentTestOtp}})
          console.log("Success")          
        }, 1000);
      }else{
        toast.error("Invalid OTP")
      }
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getOtp();

    const handleFullChange = () => {
      if (!document.fullscreenElement) {
        console.log("User exited fullscreen");
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
      <ToastContainer/>
      <Header />
      <main className="student-main">
        <div className="student-page-link">
          <div>
            <p>Total Attempted test</p>
            <h1 className="test-count">10/50</h1>
          </div>

          {
            questionData.map((item, index)=>(
              item.testName === "None" ? "" :
              <div style={{minWidth: "20rem"}} key={index}>
                <p>{item.testName}</p>
                <button onClick={()=>showVerifyBox(item.otp, item.questionID.question)} className="open-test-btn">
                  Open Test
                </button>
              </div>
            ))
          }

        </div>
      </main>

      <div className="verify-otp">
        <h1 onClick={hideVerifyBox}>X</h1>
        <input ref={otpBox} type="text" />
        <br/>
        <button onClick={verifyOtp}>Verify OTP</button>
      </div>
    </>
  );
};

export default StudentPage;
