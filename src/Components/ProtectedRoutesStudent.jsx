import { Navigate } from "react-router-dom";

const ProtectedRoutesStudent = ({children}) => {
    const role = localStorage.getItem("role");

    return (
        role === "student"  ? children: <Navigate to='/login' replace/>
    )
}

export default ProtectedRoutesStudent;