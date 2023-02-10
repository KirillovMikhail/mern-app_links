import { useCallback, useState, useEffect } from "react"

const storageName = 'userData'

//Если получам токен то храним его в локалСторедж. 
export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => { //токен и ид получаем сервера
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken})) //сохраняем это в длокалсторадж
    }, [])
    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    //смотрим есстли данные в локал сторадже
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token) { //если дата не ноль, и в дате есть поле токен
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login]) //как зависимость указываем логин, так мы его исполльзуем и поеэтому его оборачивали useCallback

    return {login, logout, token, userId, ready}
}