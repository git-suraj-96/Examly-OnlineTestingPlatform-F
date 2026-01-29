import AdminHeader from "./AdminHeader";
import '../Styles/Admin.css';
import { useRef } from "react";
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import LoaderContext from '../Context/LoaderContext';
import Loader from '../Components/Loader';
import { useContext } from "react";

const Admin = () =>{
    const formRef = useRef(null);
    const api = import.meta.env.VITE_APP_URL;
    const fullName = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const phone = useRef(null);
    const institute = useRef(null);
    const {setDisplay} = useContext(LoaderContext);

    const handleOnNewRegister = () => {
        formRef.current.style.display = "block";
    };

    const handleOnSubmitSignupForm = async() =>{
        setDisplay("block");
        try{
            const fullNameValue = fullName.current.value;
            const emailValue = email.current.value;
            const passwordValue = password.current.value;
            const phoneValue = phone.current.value;
            const instituteValue = institute.current.value;
            if(!(fullNameValue && emailValue && passwordValue && phoneValue && instituteValue)){
                setDisplay("none")
                return toast.error("All fields are required.\n Check before submit.");  
            }           

            const response = await axios.post(`${api}/teacher/signup`, {fullNameValue, emailValue, passwordValue, phoneValue, instituteValue});
            console.log(response);
            if(response.data.success){
                setDisplay("none")
                return toast.success(response.data.message);
            }else{
                setDisplay("none")
                return toast.error(response.data.message);
            }

        }catch(err){
            console.error(err);
            console.log("This error is coming from Admin.jsx file and from HandleOnSignup method and from line no 44.");
        }
        setDisplay("none");
    }

    return(
        <>
            <Loader/>
            <ToastContainer/>
            <AdminHeader/>
            <main className="admin-main">
                <div className="admin-main-btns">
                    <button onClick={handleOnNewRegister}>+ Register New Institute</button>
                </div>
                <hr/>
            </main>

            <section className="admin-section">
                <div ref={formRef} className="admin-section-form">
                    <h1>Register New Institute</h1>
                    <div>
                        <label htmlFor="fullname">FullName</label>
                        <br/>
                        <input ref={fullName} required className="capitalize" type="text" id="fullname" name="fullname" />
                        <br/>

                        <label htmlFor="email">Email</label>
                        <br/>
                        <input ref={email} required  type="text" id="email" name="email" />
                        <br/>

                        <label htmlFor="password">Password</label>
                        <br/>
                        <input ref={password} required  type="text" id="password" name="password" />
                        <br/>

                        <label htmlFor="phone">Phone</label>
                        <br/>
                        <input ref={phone} required  type="text" id="phone" name="phone" />
                        <br/>

                        <label htmlFor="institute">Institute</label>
                        <br/>
                        <input  ref={institute} required className="capitalize" type="text" id="institute" name="institute" />
                        <br/>

                        <button onClick={handleOnSubmitSignupForm}>Register</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Admin;