import React, { useEffect } from 'react';
import {Routes,Route} from "react-router-dom";
import Home from './sreenPages/Home'
import SignUp from './sreenPages/SignUp'
import TouristPlaces from './components/TouristPlaces';
import LoginPage from './sreenPages/Login';
// import Login from './sreenPages/Login';
function App() {
  // const { loginWithPopup, user, isAuthenticated, isLoading, logout } = useAuth0();

  useEffect(() => {
    
  }, []); 

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/touristPlace" element={<TouristPlaces/>}></Route>
        <Route exact path="/signup" element={<SignUp/>}></Route>
        <Route exact path="/login" element={<LoginPage/>}></Route>

      </Routes>
    </>
  );
};

export default App;
