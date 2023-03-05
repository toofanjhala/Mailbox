import React from 'react';
import AuthForm from './Component/Page/AuthenticationForm';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './Component/Page/Home';
import { Route,Routes } from 'react-router-dom';

function App() {
  const isAuthenticated=useSelector(state=>state.Auth.isLoggein)
 
  return (
    <BrowserRouter>
      <Routes>
       {!isAuthenticated && <Route path="/" exact element={<AuthForm />} /> }
       {!isAuthenticated  && <Route path="/home" element={<AuthForm/>} /> }
       {isAuthenticated && <Route path="/" exact element={<Home />} /> }
       {isAuthenticated  && <Route path="/home" element={<Home />} /> }
     </Routes>
    </BrowserRouter>
  );
}

export default App;
