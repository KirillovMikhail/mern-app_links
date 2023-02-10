import React from "react";
import {BrowserRouter} from 'react-router-dom'
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/Authcontext"; //передаем контексст
import 'materialize-css'
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";

function App() {
  const {token, login, logout, userId, ready} = useAuth() //будем передавать эти парамметры через контект вссему нашему приложению
  const isAuthenticated = !!token //авторезирован или нет смотрим по наличию токена и приводим к булевому значению
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
  return <Loader />  
  }

  return (
    <AuthContext.Provider value = {{
      token, login, logout, userId, isAuthenticated
    }}> 
    <BrowserRouter>
      <div>
        { isAuthenticated  && <Navbar />} 
        <div className="container">
          { routes }
        </div>
      </div>
   </BrowserRouter>
   </AuthContext.Provider>
    
  );
}

export default App;
