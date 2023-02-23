import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import useStyles from '../components/modalStyles'
import axios from 'axios';
import { API, BASE_URL } from '../utils/APIRoutes';
import { localStorageUser } from '../utils/globalConstants';
import { getHeaders } from '../utils/helperFunction';

const Section = styled.div`
/* display: flex; */
/* align-items: flex-start; */
/* border: 1px solid red; */
text-align: right;
padding-right: 5rem;
margin-top: 1rem;
`

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "1px solid #C4C4C4",
  boxShadow: 24,
  p: 4,
};


const PostIssue = () => {
  const [issue, setIssue] = useState({
    issueContent: '',
    locationAddressFirstLine: '',
    locationAddressSecondLine: '',
    locationCity: '',
    postalCode: ''
  })
  const [issuePics, setIssuePics] = useState('')

  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUserData() {
      const data = await JSON.parse(localStorage.getItem(localStorageUser));
      setUserData(data);
    }
    fetchUserData();
  }, []);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formHandler = (e) => {
    setIssue({ ...issue, [e.target.name]: e.target.value })
  }

  const postImage = (pics) => {
    console.log(pics);
    if (!pics) return;
    const pic = pics[0];
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dkgrvhkxb");
      fetch("https://api.cloudinary.com/v1_1/dkgrvhkxb/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setIssuePics(data.url.toString());
          console.log(data);
          console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("errrrrrorrrr");
    }
  };

  const postIssueHandler = async (e) => {
    e.preventDefault()

    const { data } = await axios.post(`${BASE_URL}${API}/issue/`, {
      issueContent: issue.issueContent,
      issuePics: issuePics,
      locationAddressFirstLine: issue.locationAddressFirstLine,
      locationAddressSecondLine: issue.locationAddressSecondLine,
      locationCity: issue.locationCity,
      postalCode: issue.postalCode
    }, {
      headers: getHeaders(userData.token),
    });
    console.log(data);
    // window.location.reload()
    if (data.status === 'success') {
      window.location.reload();
  }
  }

  return (
    <Section>
      <Button onClick={handleOpen}>Post Issue</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classes.modal} >
          <h1>Report Issues around you to make the city better</h1>
          <form onSubmit={postIssueHandler}>
            <h3>Issue Description</h3>
            <textarea name="issueContent" placeholder='Enter Issue Description' value={issue.issueContent} onChange={(e) => formHandler(e)} />

            <h3>Issue Images</h3>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => postImage(e.target.files)}
              />
            </div>
            <h3>Locations First Address Line</h3>
            <input type="text" name="locationAddressFirstLine" placeholder='Enter First Address Line' value={issue.locationAddressFirstLine} onChange={(e) => formHandler(e)} />

            <h3>Locations Second Address Line</h3>
            <input type="text" name="locationAddressSecondLine" placeholder='Enter Second Address Line' value={issue.locationAddressSecondLine} onChange={(e) => formHandler(e)} />

            <h3>Locations City Name</h3>
            <input type="text" name="locationCity" placeholder='Enter Location City' value={issue.locationCity} onChange={(e) => formHandler(e)} />

            <h3>Locations Postal Code</h3>
            <input type="text" name="postalCode" placeholder='Enter postal Code' value={issue.postalCode} onChange={(e) => formHandler(e)} />

            <button type='submit'>Submit Issue</button>
          </form>
        </Box>
      </Modal>
    </Section>
  )
}

export default PostIssue