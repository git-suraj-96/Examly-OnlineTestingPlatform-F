import { useEffect, useRef, useState } from 'react';
import Header from '../Components/Header';
import '../Styles/Teacher.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Teacher = () => {
    const studentTable = useRef(null);
    const testTable = useRef(null);
    const api = import.meta.env.VITE_APP_URL;
    const token = localStorage.getItem("token");
    const [testData, setTestData] = useState([]);
    const [testResult, setTestResult] = useState([]);
    const testRef = useRef(null);
    const navigate = useNavigate();

    const newTestDetails = () => {
        studentTable.current.style.display = "none";
        testTable.current.style.display = "block";
        testRef.current.style.display = "none";
    };

    const allStudentdDetails = () => {
        studentTable.current.style.display = "block";
        testTable.current.style.display = "none";
        testRef.current.style.display = "none";
    };

    const fetchForTestDetails = async () => {
        try {
            const response = await axios.post(`${api}/teacher/testdetails`, { token });
            if (response.data.success) {
                setTestData(response.data.message);
                setTestResult(response.data.allStudents);
            }
        } catch (err) {
            console.log(err);
            console.log("This erro is coming from fetchForTestDetails method and from Teacher.jsx file")
        }
    };

    const testDetails = () => {
        testRef.current.style.display = "block";
        studentTable.current.style.display = "none";
        testTable.current.style.display = "none";
    };

    const testFinishedBtn = async (testCode) => {
        try {
            const res = await axios.post(`${api}/teacher/testfinished`, { token, testCode });
            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate('/teacher');
                }, 2000)
            }
        } catch (err) {
            console.error(err);
            console.log("This error is coming from testFinishedBtn and from Teacher.jsx file and from line no 51");
        }
    }


    useEffect(() => {
        fetchForTestDetails();
    }, []);
    return (
        <>
            <ToastContainer />
            <Header />
            <main>
                <div className='t-main'>
                    <button onClick={allStudentdDetails}>All Students Details</button>
                    <button onClick={newTestDetails}>Get Test OTP & Details</button>
                    <button onClick={testDetails}>Test Result</button>
                    <button><Link to="/teacher/setquestion">Set Question</Link></button>
                </div>

                <div ref={studentTable} className='t-student-detail'>
                    <table>
                        <caption>All Student&apos;s Details</caption>
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Student&apos;s Name</th>
                                <th>Student&apos;s Phone</th>
                                <th>Student&apos;s E-mail</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                testResult.map((item,index)=>(
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.fullName}</td>
                                        <td>+91 - {item.phone}</td>
                                        <td style={{textTransform: "none"}}>{item.email}</td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>
                </div>

                <div ref={testTable} style={{ display: "none" }} className='t-student-detail t-new-test-details'>
                    {testData.length > 0 ?
                        <table>
                            <caption>All Test Details</caption>
                            <thead>
                                <tr>
                                    <th>Sr.no</th>
                                    <th>Test Name</th>
                                    <th>Test Validation OTP</th>
                                    <th>Test Finished</th>
                                </tr>
                            </thead>

                            <tbody>
                                {testData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.testName}</td>
                                        <td>{item.otp}</td>
                                        <td className='td-finished-button'><button onClick={() => testFinishedBtn(item.otp)}>YES</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table> : <h1 style={{textAlign: "center", fontFamily: "Georgia, 'Times New Roman', Times, serif"}}>No Test Found</h1>
                    }

                </div>

                <div ref={testRef} style={{ display: "none" }} className='t-student-detail t-new-test-details'>
                    <table>
                        <caption>Test Result</caption>
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Student Name</th>
                                <th>Test Name</th>
                                <th>Test Date (MM/DD/YYYY)</th>
                                <th>Obtained Marks</th>
                            </tr>
                        </thead>

                        <tbody>
                            {testResult.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.finishedTest.testName}</td>
                                    <td>{item.finishedTest.finishedDate}</td>
                                    <td>{item.finishedTest.obtainedMarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}

export default Teacher;