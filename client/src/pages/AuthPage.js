import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/Authcontext'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
  const auth = useContext(AuthContext) // экспортируем коонтекст с помощью хука
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({
    email:'', password: ''
  })
  // Обработка ошибок
  useEffect(()=>{
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request ('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request ('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {}
  }

  return (
    <div className='row'>
      <div className="div col s6 offset-s3">
        <h1>Сократи сылку</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                className='yellow-input'
                id="email"
                type="text"
                name="email"
                value={form.email}
                onChange = {changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                className='yellow-input'
                id="password"
                value={form.password}
                type="password"
                name='password'
                onChange = {changeHandler}
                />
                <label htmlFor="password">Пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
             className='btn yellow darken-4' 
             style={{ marginRight: 10 }}
             disabled={loading}
             onClick={loginHandler}
             >Войти
             </button>
            <button 
            className='btn grey lighten-1 black-text'
            onClick={registerHandler}
            disabled={loading}
            >
              Регистрация
             </button>
          </div>
        </div>
      </div>

    </div>
  )
}