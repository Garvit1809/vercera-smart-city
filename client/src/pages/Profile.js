import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import HelperModal from '../components/helperModal';
import Navbar from '../components/Navbar';
import { API, BASE_URL } from '../utils/APIRoutes';
import { localStorageUser } from '../utils/globalConstants';
import { getHeaders } from '../utils/helperFunction';

const Section = styled.div`
min-height: 100vh;
`

const UserDetails = styled.div`
margin-top: 1.5rem;
display: flex;
/* align-items: center; */
padding: 0 10vw;
`

const ImageContainer = styled.div`
width: 15rem;
height: 15rem;
border-radius: 50%;

img{
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: contain;
  -webkit-box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.75);
box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.75);

}
`

const Details = styled.div`
margin-left: 3rem;
text-align: left;
padding-top: 1rem;

h3{
  font-weight: 500;
  font-size: 2.5rem;
  margin-bottom: 0.8rem;
}

h4{

}
`

const Phone = styled.div`
margin-top: 0.5rem;
font-weight: 500;

`

const Profile = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(localStorage.getItem(localStorageUser));
      setUserData(data);
    }
    fetchUserData();
  }, []);
  
  return (
    <Section>
      <Navbar />
      {
        !userData.isHelper ?
          <HelperModal token={userData.token} /> : null
      }
      <UserDetails>
        <ImageContainer>
          <img src={userData.photo} alt="" />
        </ImageContainer>
        <Details>
          <h3>{userData.name}</h3>
          <h4>{userData.email}</h4>
          <Phone>
            Phone :- {userData.phoneNumber}
          </Phone>
          <h3>In Progress :)</h3>
        </Details>
      </UserDetails>

    </Section>
  )
}

export default Profile