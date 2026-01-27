import { useNavigate } from "react-router-dom"

export const Error = ()=>{
    const navigate = useNavigate();
    const reload = () =>{
        navigate(-1)
    }

    return(
        <>
            <h1>Something went wrong...</h1>
            <button onClick={reload}>Retry</button>
        </>
    )
}

