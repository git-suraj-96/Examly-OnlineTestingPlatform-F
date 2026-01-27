import { Navigate } from "react-router-dom";

const ProtectedRoutesTeacher = ({children}) => {
    const role = localStorage.getItem("role");

    return (
        role === "teacher"  ? children: <Navigate to='/login' replace/>
    )
}

export default ProtectedRoutesTeacher;