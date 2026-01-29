import '../Styles/AdminHeader.css';
import { useNavigate } from 'react-router-dom';


const AdminHeader = () => {
    const navigate = useNavigate();
    
    const logout = () => {
        try{
            localStorage.setItem("token", "");
            localStorage.setItem("role", "");
            navigate('/login', {replace: true});
        }catch(err){
            console.log(err);
            console.log("This error is coming from logout Method and from Header.jsx file..");
        }
    }
    return(
        <header>
            <nav style={style.flex} className='admin-header-nav'>
                <h1>Admin</h1>
                <button style={style.btn} onClick={logout}>Logout</button>           
            </nav>
        </header>
    )
}

const style = {

    flex: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: "20px",
    },

    btn:{
        padding: "5px 10px",
        backgroundColor: "Red",
        border: "none",
        cursor: "Pointer",
        color:" white",
        fontWeight: "bold",
        fontSize: "16px",
        borderRadius: "5px"
    }

}

export default AdminHeader;