import { Link } from 'react-router-dom';
import '../Styles/Login.css';
import Visible from '../assets/eyeIcon.png';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import Loader from './Loader';
import { useContext } from 'react';
import LoaderContext from '../Context/LoaderContext';

const Login = () =>{
    const passwordBox = useRef();
    const [boxType, setType] = useState("password");
    const email = useRef(null);
    const institute = useRef(null);
    const api = import.meta.env.VITE_APP_URL;
    const navigate = useNavigate();
    const [institutes, setInstitutes] = useState([]);
    const role = useRef(null);
    const {setDisplay} = useContext(LoaderContext);

    const handlePasswordBox = () => {
        if(boxType === "password") setType("text");
        else setType("password");       
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        const emailValue = email.current.value;
        const passwordValue = passwordBox.current.value;
        const instituteValue = institute.current.value;
        const roleValue = role.current.value;
        setDisplay("block");

        try{
            const res = await axios.post(`${api}/user/login`, {emailValue, passwordValue, instituteValue, roleValue});
            if(res.data.success){
                res.data.role === "student" ? navigate('/student'): res.data.role === "admin" ? navigate("/admin") : navigate("/teacher");
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", res.data.role);
            }else{
                toast.error(res.data.message);
            }
        }catch(err){
            console.log(err.response.data);
            toast.error(err.response.data.message);
            console.log("This error is coming from login.jsx file and from handlOnsubmit Method.")
        }
        setDisplay("none");
    }

    const getAllInstitutes = async() =>{
        setDisplay("block");
        try{
            const res = await axios.get(`${api}/user/allinstitutes`);
            if(res.data.success) {
                setInstitutes(res.data.message);
            }
        }catch(err){
            console.log(err.message);
            if(err.message === "Network Error") return navigate('/error');
            console.log("This error is coming from Login.jsx file and from getAllInstitutes routes");
        }
        setDisplay("none");
    }

    useEffect(()=>{
        getAllInstitutes();
    }, []);

    return (
        <>
            <Loader/>
            <ToastContainer/>
            <main className="login-main">
                <div className='login-container' >
                    <h1>Welcome Back to <span>Examly</span></h1>

                    <form onSubmit={(e)=>handleOnSubmit(e)}>
                        <label>Email</label>
                        <br/>
                        <input autoComplete='current-email' ref={email} name='email' type="email" required />

                        <br/>

                        <label>Password</label>
                        <br/>
                        <div className='login-password-box'>
                            <input autoComplete='current-password' ref={passwordBox} name='password' type= {boxType} required />
                            <img className='password-box-visible' onClick={handlePasswordBox} src={Visible} alt="Visible" />
                        </div>
                        <br/>

                        <label>Select Institute</label>
                        <br/>
                        <select ref={institute} name='institute' required>
                            {
                                institutes.sort().map((item, index)=>(
                                    <option value={item.institute} key={index}>{item.institute}</option>
                                ))
                            }
                        </select>

                        <br/>
                        <br/>

                        <label>Role</label>
                        <br/>
                        <select ref={role} name='role' required >
                            <option value="student" key="student">Student</option>
                            <option value="teacher" key="teacher">Teacher</option>
                            <option value="admin" key="admin" >Admin</option>
                        </select>

                        <br/>

                        <button type='submit'>Login</button>
                    </form>
                
                    <p className='login-blue'>Forgot Password?</p>
                    <p>Don&apos;t have an account? <Link  to='/signup'><span className='login-blue'>signup</span> </Link></p>

                </div>
            </main>
        </>
    )
}

export default Login;