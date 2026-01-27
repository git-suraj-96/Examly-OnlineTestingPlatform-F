import '../Styles/Header.css';
import Logo from '../assets/Examly-logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () =>{
    const navigate = useNavigate();

    const logout = () => {
        try{
            localStorage.setItem("token", "");
            localStorage.setItem("role", "");
            navigate('/login');
        }catch(err){
            console.log(err);
            console.log("This error is coming from logout Method and from Header.jsx file..");
        }
    }
    return(
        <>
            <main className='header-main'>
                <div>
                    <img src={Logo} alt="LogoImage" />
                    <div>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Header;