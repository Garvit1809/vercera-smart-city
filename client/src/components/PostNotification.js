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
    // height: 300,
    bgcolor: "background.paper",
    border: "1px solid #C4C4C4",
    boxShadow: 24,
    p: 4,
};

const PostNotification = (props) => {
    console.log(props);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [message, setMessage] = useState('')

    const postNotiHandler = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(`${BASE_URL}${API}/notification/`, {
            message
        }, {
            headers: getHeaders(props.token),
        })
        console.log(data);
        // window.location.reload()
        if (data.status === 'success') {
            window.location.reload();
        }
    }

    return (
        <Section>
            <Button onClick={handleOpen}>Post Notification</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={classes.modal} >
                    <h1>Publish Notifications for general public</h1>
                    <form onSubmit={postNotiHandler}>
                        <h3>Notification Description</h3>
                        <textarea name="issueContent" placeholder='Enter the notification' value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button type='submit'>Post Notification</button>
                    </form>
                </Box>
            </Modal>
        </Section>
    )
}

export default PostNotification