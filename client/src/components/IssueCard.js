import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { API, BASE_URL } from '../utils/APIRoutes'
import { localStorageUser } from '../utils/globalConstants'
import { getHeaders } from '../utils/helperFunction'

const Section = styled.div`
border: 1px solid black;
width: 40vw;
margin: 0 5vw;
`

const AuthorDetails = styled.div`
border: 1px solid red;

`

const ImageContainer = styled.div`
width: 3rem;
height: 3rem;
border: 1px solid red;

img{
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain;
}
`

const Location = styled.div`

`

const IssueContent = styled.div`
border: 1px solid red;
text-align: left;

img{
    width: 100%;
    height: 100%;
}
`

const IssueImage = styled.div`
width: 100%;
height: 40vh;
object-fit: contain;
`

const ApprovedBy = styled.div``

const ClosedBy = styled.div``

const IssueCard = (props) => {
    const issue = props.issue;

    const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(localStorage.getItem(localStorageUser));
      setUserData(data);
    }
    fetchUserData();
  }, []);

  const approveIssueHandler = async (e) => {
    // e.preventDefauslt();
    const { data } = await axios.patch(`${BASE_URL}${API}/issue/${issue._id}/approve`, {}, {
        headers: getHeaders(userData.token),
    });
    console.log(data);
  }

  const closeissueHandler = async (e) => {
    // e.preventDefauslt();
    const { data } = await axios.patch(`${BASE_URL}${API}/issue/${issue._id}/close`, {}, {
        headers: getHeaders(userData.token),
    });
    console.log(data);
  }

  const navigate = useNavigate();
  const singlePageNavigator = () => {
    navigate(`/issues/${issue._id}`)
  }

    return (
        <Section >
            <IssueContent onClick={singlePageNavigator} >
                <p>
                    {issue.issueContent}
                </p>
                <IssueImage>
                    <img src={issue.issuePics} alt="" />
                </IssueImage>
            </IssueContent>
            <Location onClick={singlePageNavigator} >
                <h5>Location :-</h5>
                <h4>{issue.locationAddressFirstLine} {issue.locationAddressSecondLine}, {issue.locationCity}, {issue.postalCode}</h4>
            </Location>
            <AuthorDetails onClick={singlePageNavigator} >
                <h5>Raise By :-</h5>
                <ImageContainer>
                    <img src={issue.issueRaisedBy.photo} alt="" />
                </ImageContainer>
                <h3>{issue.issueRaisedBy.name}</h3>
            </AuthorDetails>
            {
                issue.isIssueApproved ?
                    <ApprovedBy>
                        <h5>Approved By :-</h5>
                        <ImageContainer>
                            <img src={issue.issueApprovedBy.photo} alt="" />
                        </ImageContainer>
                        <h3>{issue.issueApprovedBy.name}</h3>
                    </ApprovedBy> : null
            }
            {
                issue.isIssueResolved ?
                    <ClosedBy>
                        <h5>Closed By :-</h5>
                        <ImageContainer>
                            <img src={issue.issueClosedBy.photo} alt="" />
                        </ImageContainer>
                        <h3>{issue.issueClosedBy.name}</h3>
                    </ClosedBy> : null
            }
            {
                !issue.isIssueApproved && userData.isHelper ? 
                <button onClick={approveIssueHandler} >Approve Issue</button> : null
            }
            {
                issue.isIssueApproved && !issue.isIssueResolved && userData.isHelper && issue.issueUpdates.length > 0 ?
                <button onClick={closeissueHandler} >Close Issue</button> : null
            }
        </Section>
    )
}

export default IssueCard