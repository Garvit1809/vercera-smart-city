import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { API, BASE_URL } from '../utils/APIRoutes'
import { localStorageUser } from '../utils/globalConstants'
import { getHeaders } from '../utils/helperFunction'

const Section = styled.div`
/* border: 1px solid black; */
width: 42.5vw;
margin: 1rem .5vw 2rem 5vw;
padding: 0.4rem 1rem;
border-radius: 10px;

-webkit-box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.75);
box-shadow: 0px 2px 16px 0px rgba(0,0,0,0.75);

button{
    margin: 1rem;
    padding: 1rem;
    outline: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
}
`

const AuthorDetails = styled.div`
/* border: 1px solid purple; */
text-align: left;
margin-top: 0.8rem;

h5,h4,h3{
    font-weight: 500;
}

div{
    display: flex;
    align-items: center;
    /* justify-content: ; */
}
`

const ImageContainer = styled.div`
width: 2rem;
height: 2rem;
/* border: 1px solid red; */

img{
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* margin-right: 1rem; */
}
`

const Location = styled.div`
/* border: 1px solid red; */
text-align: left;
h5,h4{
    font-weight: 500;
}
`

const IssueContent = styled.div`
/* border: 1px solid red; */
text-align: left;
margin-bottom: 0.5rem;

p{
    margin-bottom: 0.5rem;
}

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

const ApprovedBy = styled.div`
/* border: 1px solid purple; */
text-align: left;
margin-top: 0.8rem;

h5,h4,h3{
    font-weight: 500;
}

div{
    display: flex;
    align-items: center;
    /* justify-content: ; */
}
`

const ClosedBy = styled.div`
/* border: 1px solid purple; */
text-align: left;
margin-top: 0.8rem;

h5,h4,h3{
    font-weight: 500;
}

div{
    display: flex;
    align-items: center;
    /* justify-content: ; */
}
`

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
                <div>

                    <ImageContainer>
                        <img src={issue.issueRaisedBy.photo} alt="" />
                    </ImageContainer>
                    <h3>{issue.issueRaisedBy.name}</h3>
                </div>
            </AuthorDetails>
            {
                issue.isIssueApproved ?
                    <ApprovedBy>
                        <h5>Approved By :-</h5>
                        <div>
                            <ImageContainer>
                                <img src={issue.issueApprovedBy.photo} alt="" />
                            </ImageContainer>
                            <h3>{issue.issueApprovedBy.name}</h3>
                        </div>
                    </ApprovedBy> : null
            }
            {
                issue.isIssueResolved ?
                    <ClosedBy>
                        <h5>Closed By :-</h5>
                        <div>
                            <ImageContainer>
                                <img src={issue.issueClosedBy.photo} alt="" />
                            </ImageContainer>
                            <h3>{issue.issueClosedBy.name}</h3>
                        </div>
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