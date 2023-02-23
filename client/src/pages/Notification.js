import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import PostNotification from '../components/PostNotification'
import { API, BASE_URL } from '../utils/APIRoutes'
import { getReadableTime, localStorageUser } from '../utils/globalConstants'

const Section = styled.div`

`

const NotificationGrid = styled.div`
/* border: 1px solid re
d; */
/* min-hei */

`

const NotificationCard = styled.div`
width: 60%;
/* border: 1px solid red; */
margin: 2rem auto 4rem;
padding: 1.5rem;
text-align: left;
border-radius: 10px;
-webkit-box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.75);
box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.75);

p{
  margin-bottom: 1rem;
}

h3,h4,h5{
  font-weight: 500;
}
`

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  async function getNotifications() {
    const { data } = await axios.get(`${BASE_URL}${API}/notification`)
    console.log(data);
    setNotifications(data.notifications)
  }

  useEffect(() => {
    getNotifications()
  }, [])

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
        userData.isHelper ?
          <PostNotification token={userData.token} /> : null
      }
      <NotificationGrid>
        {
          notifications.map((notification, index) => {
            return (
              <NotificationCard>
                <p>
                  {notification.message}
                </p>
                <h5>Notified By :-</h5>
                <div className='noti' >
                <h4>{notification.notifiedBy.name}</h4>
                <h3>{getReadableTime(notification.createdAt)}</h3>
                </div>
              </NotificationCard>
            )
          })
        }
      </NotificationGrid>
    </Section>
  )
}

export default Notification