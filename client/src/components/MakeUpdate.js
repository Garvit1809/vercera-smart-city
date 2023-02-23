import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import useStyles from './modalStyles'
import styled from 'styled-components';
import axios from 'axios';
import { API, BASE_URL } from '../utils/APIRoutes';
import { getHeaders } from '../utils/helperFunction';

const Section = styled.div`
margin: 1rem 0 2rem;
/* border: 1px solid red; */

text-align: right;
padding-right: 4rem;
`

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    // height: 300,
    bgcolor: "background.paper",
    border: "1px solid #C4C4C4",
    boxShadow: 24,
    p: 4,
};

const MakeUpdate = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [updateContent, setUpdateContent] = useState();
    const [updateImages, setUpdateImages] = useState()

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
                    setUpdateImages(data.url.toString());
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

    const postIssueUpdate = async (e) => {
        e.preventDefault();

        const { data } = await axios.patch(`${BASE_URL}${API}/issue/${props.issueId}`, {
            updateContent,
            updateImages
        }, {
            headers: getHeaders(props.token),
        })
        console.log(data);
        if (data.status === 'success') {
            window.location.reload();
        }
    }

    return (
        <Section>
            <Button onClick={handleOpen}>Make Update</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={classes.modal} >
                    <h1>Give an update to this Issue</h1>
                    <form onSubmit={postIssueUpdate}>
                        <h3>Update Description</h3>
                        <textarea name="updateContent" placeholder='Specify the Update on the issue' value={updateContent} onChange={(e) => setUpdateContent(e.target.value)} />
                        <h3>Upload Proof Image</h3>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => postImage(e.target.files)}
                            />
                        </div>
                        <button type='submit'>Post Update</button>
                    </form>
                </Box>
            </Modal>
        </Section>
    )
}

export default MakeUpdate