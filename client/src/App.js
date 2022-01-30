import { useState } from 'react'
import {Routes, Route, useNavigate} from "react-router-dom";
import Home from "./components/home/Home";
import Auth from './components/registerSystem/Auth';
import AddMemo from "./components/addMemo/AddMemo";
import Profile from './components/profile/Profile';
import { Button } from 'react-bootstrap';

function App() {

  const [currentId, setCurrentId] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const navigate = useNavigate()

  const userId = user?.result?._id || user?.result?.googleId


const RootPage = () =>{
  const goBack = () =>{
    navigate('/memories')
  }
  return (
    <div style={{margin:'50px'}}>
    <p>You are already logged in!</p>
    <Button onClick={goBack}>Go back</Button>
    </div>
  )
}

  return (
    <div className="App">
        <Routes>
        {
          !user ? (
            <Route path="/" element={<Auth/>}/>
          ) : (
            <Route path="/" element={<RootPage/>}/>
          )
        }
          <Route path="/memories" element={<Home setUser={setUser} currentId={currentId} setCurrentId={setCurrentId}/>}/>
          <Route path={`/:${userId}/creatememory`} element={<AddMemo currentId={currentId} setCurrentId={setCurrentId}/>}/>
          <Route path={`/:id/persoprofile`} element={<Profile setCurrentId={setCurrentId} currentId={currentId}/>}/>
        </Routes>
    </div>
  ); 
}

export default App;