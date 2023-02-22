import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Section = styled.div``

const Login = () => {
  return (
    <Section>
      <form>
        <input type="email" name=""  />
        <input type="password" name=""  />
        <button type="submit">Login</button>
      </form>
      <h4>Dont have an account?? <Link to="/signup">Create an Account</Link></h4>
    </Section>
  )
}

export default Login