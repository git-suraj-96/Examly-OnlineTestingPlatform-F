import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Components/Login'
import Signup from './Components/Signup';
import StudentPage from './Components/StudentPage';
import TeacherSetQuestion from './Components/Teacher.set.question';
import Teacher from './Components/Teacher';
import Admin from './Components/Admin';
import { Error } from './Components/Error';
import ProtectedRoutesStudent from './Components/ProtectedRoutesStudent';
import ProtectedRoutesTeacher from './Components/ProtectedRoutesTeacher';
import ProtectedRoutesAdmin from './Components/ProtectedRoutesAdmin';
import { Navigate } from 'react-router-dom';
import OpenTest from './Components/OpenText';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to='/login'/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/student' element={<ProtectedRoutesStudent><StudentPage/></ProtectedRoutesStudent>} />
          <Route path='/student/opentest' element={<ProtectedRoutesStudent><OpenTest/></ProtectedRoutesStudent>} />
          <Route path='/teacher/setquestion' element={<ProtectedRoutesTeacher><TeacherSetQuestion/></ProtectedRoutesTeacher>} />
          <Route path='/teacher' element={<ProtectedRoutesTeacher><Teacher/></ProtectedRoutesTeacher>} />
          <Route path='/admin' element={<ProtectedRoutesAdmin><Admin/></ProtectedRoutesAdmin>} />
          <Route path='/error' element={<Error/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
