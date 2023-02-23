import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import IssueCard from '../components/IssueCard'
import Navbar from '../components/Navbar'
import { API, BASE_URL } from '../utils/APIRoutes'

const Section = styled.div`
/* border: 1px solid red; */
min-height: 100vh;
`

const IssueGrid = styled.div`
display: grid;
grid-template-columns: auto auto;
margin-top: 2rem;
`

const PendingIssues = () => {
  const [approvedIssues, setApprovedIssues] = useState([]);

  async function getUnapprovedIssues () {
    const { data } = await axios.get(`${BASE_URL}${API}/issue/approved`)
    console.log(data);
    setApprovedIssues(data.approvedIssues)
  }

  useEffect(() => {
    getUnapprovedIssues()
  }, [])
  
  return (
    <Section>
      <Navbar/>
      <IssueGrid>
        {
          approvedIssues.map((issue) => {
            return (
              <IssueCard issue={issue} /> 
            )
          })
        }
      </IssueGrid>
    </Section>
  )
}

export default PendingIssues