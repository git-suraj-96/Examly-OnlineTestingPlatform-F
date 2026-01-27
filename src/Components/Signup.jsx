import { useEffect, useState } from 'react';
import '../Styles/Login.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast}  from 'react-toastify';

const Signup = () => {
    const [institutes, setInstitutes] = useState([]);
    const api = import.meta.env.VITE_APP_URL;
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        institute: ""
    });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const getAllInstitutes = async() =>{
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
    };

    const handleOnSubmitSignup = async(e) => {
        e.preventDefault();
        if(form.email === '' || form.fullName === "" || form.phone === "" ||form.password === "" ||form.institute === ""){
            return toast.error("All Fields are required.");
        }
        if(!emailRegex.test(form.email)){
            return toast.error("Please fill correct email.")
        }
        if(form.institute === "---Select your institute---" || "") return toast.error("Please select your institute.")
        try{
            console.log("signup button is working very well.");
            console.log(form);
            const response = await axios.post(`${api}/student/signup`, {fullName: form.fullName, phone: form.phone, email: form.email, password: form.password, institute: form.institute});
            if(response.data.success){
                localStorage.setItem('token', response.data.token);
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/student');
                }, 2000);
            }
        }catch(err){
            console.log(err);
            console.log("This error is coming from handleOnSubmitSignup and from Signup.jsx file.");
        }
    }


    const setFormFunction = (e)=>{
        const {name, value} = e.target;

        setForm({...form, [name]: value});
    }

    useEffect(()=>{
        getAllInstitutes();
    }, []);
    
    return (
        <>
            <ToastContainer/>
            <main className="login-main">
                <div className='login-container' >
                    <h1 style={{textAlign: 'center'}}>Signup now</h1>

                    <form method='post' action='/user/login'>
                        <label>Full Name</label>
                        <br/>
                        <input value={form.fullName} onChange={setFormFunction} name='fullName' type="text" required />

                        <br/>

                        <label>Phone</label>
                        <br/>
                        <input value={form.phone} onChange={setFormFunction} name='phone' type="phone" required />

                        <br/>
                        <label>Email</label>
                        <br/>
                        <input value={form.email} onChange={setFormFunction} name='email' type="email" required />

                        <br/>

                        <label>Password</label>
                        <br/>
                        <input value={form.password} onChange={setFormFunction} name='password' type='text' required />

                        <br/>

                        <label>Select Institute</label>
                        <br/>
                        <select onChange={setFormFunction} name='institute' required>
                            <option value={"---Select your institute---"} key={"select your instittute"}>{"---Select your institute---"}</option>
                            {
                                institutes.map((item, index)=>(
                                    <option value={item.institute} key={index}>{item.institute}</option>
                                ))
                            }
                        </select>

                        <br/>

                        <button onClick={handleOnSubmitSignup} type='submit'>Signup</button>
                    </form>
                
                    <p>Already have an account? <Link  to='/login'><span className='login-blue'>login</span> </Link></p>

                </div>
            </main>
        </>
    );
}

export default Signup;