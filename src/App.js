import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import AboutUs from './components/AboutUs/AboutUs';
import AllDiet from './components/Diet/AllDiet';
import Login from './components/Auth/Login';
import Navbar from './components/Navbar';
import DietState from './context/Diets/DietState';
import Alert from './components/Alert';
import DashBoard from './components/DashBoard';
import SignUp from './components/Auth/SignUp';
import AddDiet from './components/Diet/AddDietProf';
import MyDiet from './components/Diet/mydiet';
import Home from './pages/Home';

import { useState } from 'react';
function App() {
  const [alert, SetAlert] = useState(null);
  const showAlert = (message, type) => {
    SetAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      SetAlert(null);
    }, 1500);
    // 1500 msec.
  }
  return (
    <>
      <DietState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<DashBoard showAlert={showAlert} />} />
              <Route exact path="/about" element={<AboutUs />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} />
              <Route exact path="/alldiet" element={<AllDiet showAlert={showAlert} />} />
              <Route exact path="/home" element={<Home  />} />
              <Route exact path="/aboutus" element={<AboutUs />} />
              <Route exact path="/adddiet" element={<AddDiet showAlert={showAlert} />} />
              <Route exact path="/mydiet" element={<MyDiet showAlert={showAlert} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DietState>
    </>
  );
}

export default App;
