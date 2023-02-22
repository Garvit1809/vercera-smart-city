import React, { useState } from 'react'
import styled from 'styled-components'
import PostIssue from '../components/PostIssue'

const Section = styled.div`

`

const Issues = () => {
    const [issues, setIssues] = useState([])
  return (
    <Section>
        <PostIssue/>
    </Section>
  )
}

export default Issues