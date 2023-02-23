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
border-radius: 10px;

img{
    /* border-radius: 10px; */
    width: 100%;
    height: 100%;
}
`
const DescriptionBox = styled.div`
margin: 0 5vw;
width: 35vw;
text-align: left;

p{
    margin-bottom: 1.5rem;
}

h3,h4,h5{
    font-weight: 500;
}

h4{
    margin-bottom: 0.5rem;
}

h3{
    margin-bottom: 1rem;
}
`

const Updates = styled.div`
/* border: 1px solid red; */

h2{
    margin-bottom: 1.5rem;
}

padding: 2.5rem 5vw;
text-align: left;
`

const UpdateList = styled.li`
list-style: none;
`

const UpdateItem = styled.div`
/* border: 1px solid red; */
border-radius: 12px;
padding: 0.6rem 1rem;
margin-bottom: 2rem;
-webkit-box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.75);
box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.75);
`


const UpdatedBy = styled.div`
display: flex;
margin-bottom: 0.8rem;


h3,h4,h5{
    font-weight: 400;
    margin-left: 0.5rem;
}
`

const Content = styled.div``
const UserImage = styled.div`
width: 2.5rem;
height: 2.5rem;
/* border: 1px solid red; */

img{
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin-right: 1rem;
}
`

const ContentImg = styled.div`
width: 90vw;
height: 40vh;
/* border: 1px solid red; */

img{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
`

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
                                            <div>
                                            <h3>{update.updatedBy.name}</h3>
                                            <h4>{getReadableTime(update.createdAt)}</h4>
                                            </div>
                                        </UpdatedBy>
                                        <Content>
                                        <p>
                                            {update.updateContent}
                                        </p>
                                        <ContentImg>
                                            <img src={update.updateImages} alt="" />
                                        </ContentImg>
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