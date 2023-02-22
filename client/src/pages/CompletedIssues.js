import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import IssueCard from '../components/IssueCard'
import Navbar from '../components/Navbar'
import { API, BASE_URL } from '../utils/APIRoutes'

const Section = styled.div``

const IssueGrid = styled.div`
display: grid;
grid-template-columns: auto auto;
`

const CompletedIssues = () => {
  const [completedIssues, setCompletedIssues] = useState([]);

  async function getCompletedIssues () {
    const { data } = await axios.get(`${BASE_URL}${API}/issue/completed`)
    console.log(data.resolvedIssues);
    setCompletedIssues(data.resolvedIssues);
  }

  useEffect(() => {
    getCompletedIssues()
  }, [])


  return (
    <Section>
      <Navbar />
      <IssueGrid>
        {
          completedIssues.map((issue, index) => {
            return (
              <IssueCard issue={issue} />
            )
          })
        }
      </IssueGrid>
    </Section>
  )
}

export default CompletedIssues