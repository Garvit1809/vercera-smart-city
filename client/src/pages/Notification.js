import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import { API, BASE_URL } from '../utils/APIRoutes'
import { getReadableTime } from '../utils/globalConstants'

const Section = styled.div``

const NotificationGrid = styled.div`
border: 1px solid red;
/* min-hei */
`

const NotificationCard = styled.div`
width: 60%;
border: 1px solid red;
margin: 1rem auto;
`

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  async function getNotifications () {
    const { data } = await axios.get(`${BASE_URL}${API}/notification`)
    console.log(data);
    setNotifications(data.notifications)
  }

  useEffect(() => {
    getNotifications()
  }, [])

  

  return (
    <Section>
      <Navbar />
      <NotificationGrid>
          {
            notifications.map((notification,index) => {
              return (
                <NotificationCard>
                  <p>
                    {notification.message}
                  </p>
                  <h5>Notified By :-</h5>
                  <h4>{notification.notifiedBy.name}</h4>
                  <h4>{getReadableTime(notification.createdAt)}</h4>
                </NotificationCard>
              )
            })
          }
      </NotificationGrid>
    </Section>
  )
}

export default Notification