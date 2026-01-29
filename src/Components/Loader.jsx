import '../Styles/Loader.css';
import { useContext } from 'react';
import LoaderContext from '../Context/LoaderContext';

const Loader = () => {
    const {display} = useContext(LoaderContext);

    return(
        <>
            <div className='loader-main' style={{display: display}} >
                <div className='loader-main-flex'> 
                    <div className="loader"></div>
                </div>
            </div>
        </>
    )
};



export default Loader;