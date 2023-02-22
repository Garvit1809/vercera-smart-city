import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { API, BASE_URL } from '../utils/APIRoutes'
import { localStorageUser } from '../utils/globalConstants'

const Section = styled.div`
`

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const loginFormHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
     const { data } = await axios.post(`${BASE_URL}${API}/auth/login`, {
      email: userData.email,
      password: userData.password
     });
     console.log(data);
     if (data.status === 'success') {
      data.user.token = data.token
      localStorage.setItem(localStorageUser, JSON.stringify(data.user))
      navigate('/')
  }
  }

  return (
    <Section>
      <form onSubmit={handleSubmit} >
        <input type="email" name="email" placeholder='Email' value={userData.email} onChange={(e) => loginFormHandler(e)} />
        <input type="password" name="password" placeholder='Password' value={userData.password} onChange={(e) => loginFormHandler(e)} />
        <button type="submit">Login</button>
      </form>
      <h4>Dont have an account?? <Link to="/signup">Create an Account</Link></h4>
    </Section>
  )
}

export default Login