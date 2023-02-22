import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import IssueCard from '../components/IssueCard'
import Navbar from '../components/Navbar'
import PostIssue from '../components/PostIssue'
import { API, BASE_URL } from '../utils/APIRoutes'

const Section = styled.div`

`

const IssueGrid = styled.div`
border: 1px solid red;
display: grid;
grid-template-columns: auto auto;
`

const Issues = () => {
  const [issues, setIssues] = useState([])

  async function fetchUnApprovedIssues() {
    const { data } = await axios.get(`${BASE_URL}${API}/issue/unapproved`)
    console.log(data);
    setIssues(data.unapprovedIssues);
  }

  useEffect(() => {
    fetchUnApprovedIssues()
  }, [])


  return (
    <Section>
      <Navbar />
      <PostIssue />
      <IssueGrid>

        {
          issues.map((issue, index) => {
            return (<IssueCard issue={issue} />)
          })
        }
      </IssueGrid>
    </Section>
  )
}

export default Issues