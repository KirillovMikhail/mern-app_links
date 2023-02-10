import {createContext} from 'react'


//передача контексста всему нашему приложению
function noop() {} //пустая фунция которая ничего не делает

export const AuthContext = createContext ({
    token: null,
    userID: null,
    login: noop(),
    logout: noop(),
    isAuthenticated: false
})