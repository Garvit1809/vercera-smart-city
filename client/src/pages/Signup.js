import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Section = styled.div``

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    photo: '',
    aadhaarCardNumber: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: ''
  })
  const signupHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  return (
    <Section>
      <form>
        <input type="text" name="name" value={userData.name} onChange={(e) => signupHandler(e)} />
        <input type="email" name="" value={userData.email} onChange={(e) => signupHandler(e)} />
        <input type="file" name="" id="" />
        <input type="number" name="" id="" />
        <input type="password" name="" id="" />
        <input type="password" name="" id="" />
        <button type="submit">Create Account</button>
      </form>
      <h4>Already have an account?? <Link to="/login">Login</Link></h4>
    </Section>
  )
}

export default Signup