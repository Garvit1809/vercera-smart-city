import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import MakeUpdate from '../components/MakeUpdate';
import Navbar from '../components/Navbar'
import { API, BASE_URL } from '../utils/APIRoutes';
import { getReadableTime, localStorageUser } from '../utils/globalConstants'

const Section = styled.div``

const IssueDescription = styled.div`
display: flex;
`

const ImageContainer = styled.div`
width: 45vw;
height: 50vh;
margin: 0 5vw;

img{
    width: 100%;
    height: 100%;
}
`
const DescriptionBox = styled.div`
margin: 0 5vw;
width: 35vw;
`

const Updates = styled.div``
const UpdateList = styled.li``
const UpdateItem = styled.div``
const UpdatedBy = styled.div``
const Content = styled.div``
const UserImage = styled.div``

const Comments = styled.div``

const SingleIssue = () => {
    const [issueId, setIssueId] = useState();
    const [issue, setIssue] = useState()

    useEffect(() => {
        console.log(window.location.pathname);
        const path = window.location.pathname;
        const id = path.slice(8);
        console.log(id);
        setIssueId(id);
    }, [])

    async function getIssue() {
        const { data } = await axios.get(`${BASE_URL}${API}/issue/${issueId}`)
        console.log(data.issue);
        setIssue(data.issue)
    }

    useEffect(() => {
        if (issueId) {
            getIssue();
        }
    }, [issueId])

    const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(localStorage.getItem(localStorageUser));
      setUserData(data);
    }
    fetchUserData();
  }, []);


    return (
        issue ? (
            <Section>
                <Navbar />
                <MakeUpdate token={userData.token} issueId={issueId}/>
                <IssueDescription>
                    <ImageContainer>
                        <img src={issue.issuePics} alt="" />
                    </ImageContainer>
                    <DescriptionBox>
                        <p>
                            {issue.issueContent}
                        </p>
                        <h4>Location :-</h4><br />
                        <h3>{issue.locationAddressFirstLine} {issue.locationAddressSecondLine}, {issue.locationCity}, {issue.postalCode}</h3>
                        <h4>Raised By :-</h4>
                        <h3>{issue.issueRaisedBy.name}</h3>
                    </DescriptionBox>
                </IssueDescription>
                <Updates>
                    <h2>Updates :-</h2>
                    <UpdateList>
                        {
                            issue.issueUpdates.map((update, index) => {
                                return (
                                    <UpdateItem>
                                        <UpdatedBy>
                                            <UserImage>
                                                <img src={update.updatedBy.photo} alt="" />
                                            </UserImage>
                                            <h3>{update.updatedBy.name}</h3>
                                            <h4>{getReadableTime(update.createdAt)}</h4>
                                        </UpdatedBy>
                                        <Content>
                                            {update.updateContent}
                                            <img src={update.updateImages} alt="" />
                                        </Content>
                                    </UpdateItem>
                                )
                            })
                        }
                    </UpdateList>
                </Updates>
                <Comments>

                </Comments>
            </Section>
        ) : <h2>Loding.... Waits!!!</h2>
    )
}

export default SingleIssue