import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API, BASE_URL } from '../utils/APIRoutes'
import { localStorageUser } from '../utils/globalConstants'

const Section = styled.div`
form{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
`

const Signup = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    aadhaarCardNumber: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: ''
  })
  const [photo, setPhoto] = useState();

  const navigate = useNavigate();

  const signupHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const postImage = (pics) => {
    console.log(pics);
    if (!pics) return;
    const pic = pics[0];
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dkgrvhkxb");
      fetch("https://api.cloudinary.com/v1_1/dkgrvhkxb/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPhoto(data.url.toString());
          console.log(data);
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("errrrrrorrrr");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`${BASE_URL}${API}/auth/signup`, {
      name: userData.name,
      email: userData.email,
      photo: photo,
      aadhaarCardNumber: userData.aadhaarCardNumber,
      phoneNumber: userData.phoneNumber,
      password: userData.password,
      passwordConfirm: userData.passwordConfirm
    })
    console.log(data);
    if (data.status === 'success') {
      data.user.token = data.token
      localStorage.setItem(localStorageUser, JSON.stringify(data.user))
      navigate('/')
    }
  }

    return (
      <Section>
        <form onSubmit={submitHandler} >
          <input type="text" name="name" placeholder='Your name' value={userData.name} onChange={(e) => signupHandler(e)} />
          <input type="email" name="email" placeholder='Your Email Id' value={userData.email} onChange={(e) => signupHandler(e)} />
          <div>
            Choose a photo
            <input
              type="file"
              accept="image/*"
              onChange={(e) => postImage(e.target.files)}
            />
          </div>
          <input type="text" name="aadhaarCardNumber" placeholder='Aadhaar Card Number' value={userData.aadhaarCardNumber} onChange={(e) => signupHandler(e)} />
          <input type="text" name="phoneNumber" placeholder='Phone Number' value={userData.phoneNumber} onChange={(e) => signupHandler(e)} />
          <input type="password" name="password" placeholder='Password' value={userData.password} onChange={(e) => signupHandler(e)} />
          <input type="password" name="passwordConfirm" placeholder='Confirm Password' value={userData.passwordConfirm} onChange={(e) => signupHandler(e)} />
          <button type="submit">Create Account</button>
        </form>
        <h4>Already have an account?? <Link to="/login">Login</Link></h4>
      </Section>
    )
  }

export default Signup