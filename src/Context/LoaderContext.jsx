import { createContext, useState } from "react";

const LoaderContext = createContext();

export const  LoaderProvider = ({children}) => {
    const [display, setDisplay] = useState("none");

    return (
        <LoaderContext.Provider value={{display, setDisplay}}>
            {children}
        </LoaderContext.Provider>
    )
};

export default LoaderContext;
