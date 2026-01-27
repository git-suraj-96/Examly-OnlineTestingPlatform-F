import { Navigate } from "react-router-dom";

const ProtectedRoutesAdmin = ({children}) => {
    const role = localStorage.getItem("role");

    return (
        role === "admin"  ? children: <Navigate to='/login' replace/>
    )
}

export default ProtectedRoutesAdmin;