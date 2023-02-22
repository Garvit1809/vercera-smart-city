import React from 'react'
import styled from 'styled-components'

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
    // console.log(props.issue);
    const issue = props.issue;
    return (
        <Section>
            <IssueContent>
                <p>
                    {issue.issueContent}
                </p>
                <IssueImage>
                <img src={issue.issuePics[0]} alt="" />
                </IssueImage>
            </IssueContent>
            <Location>
                <h5>Location :-</h5>
                <h4>{issue.locationAddressFirstLine} {issue.locationAddressSecondLine}, {issue.locationCity}, {issue.postalCode}</h4>
            </Location>
            <AuthorDetails>
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
                <ImageContainer>
                    <img src={issue.issueClosedBy.photo} alt="" />
                </ImageContainer>
                <h3>{issue.issueClosedBy.name}</h3>
                </ClosedBy> : null
            }
        </Section>
    )
}

export default IssueCard