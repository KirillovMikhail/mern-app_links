import React from "react";
import {Routes, Route, useNavigate, redirect} from 'react-router-dom'
import { AuthPage } from "./pages/AuthPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { LinksPage } from "./pages/LinksPage";

export const useRoutes = isAuthenticated => { //авториризирован ли пользователь
    
    if (isAuthenticated) { // если да, те у него ессть токен
        
        return (
            <Routes>  
                {/* экзект чтобы откликаля исключительно на данную ссылку */}
                <Route path="/links" element={<LinksPage />} exact /> 
                <Route path="/create" element={<CreatePage />} exact /> 
                {/* :id - так как будет определять какуюссылку именно открыли */}
                <Route path="detail/:id" element={<DetailPage />} /> 
                {/* Если не попали нак какйото роут то  до страницы креате / теперь надо использовать useNavigate*/}
                <Route path="*" element={<CreatePage />}/>
            </Routes>
        )
    }

    return (                //     елси нет
        <Routes>
                <Route path="/" element={<AuthPage />} exact /> 
                <Route path="*" element={<AuthPage />}/>
        </Routes>
    )
}