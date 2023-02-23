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

const HelperModal = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [helperData, setHelperData] = useState({
        socialWorkDone: '',
        reason: '',
        alternatePhoneNumber: ''
    })

    const postHelperDraft = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(`${BASE_URL}${API}/user/helper`, {
            socialWorkDone: helperData.socialWorkDone,
            reason: helperData.reason,
            alternatePhoneNumber: helperData.alternatePhoneNumber
        }, {
            headers: getHeaders(props.token),
        })
        console.log(data);
        if (data.status === 'success') {
            window.location.reload();
        }
    }

    const formHandler = (e) => {
        setHelperData({...helperData, [e.target.name]: e.target.value});
    }

  return (
    <Section>
        <Button onClick={handleOpen}>Become a Helper</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className={classes.modal} >
                    <h1>Serve the nation by becoming a HELPER</h1>
                    <form onSubmit={postHelperDraft}>
                        <h3>Reason to becomen a Helper</h3>
                        <textarea name="reason" placeholder='Reason for applying' value={helperData.reason} onChange={(e) => formHandler(e)} />
                        <h3>Socila Work Done in the past</h3>
                        <textarea name="socialWorkDone" placeholder='Good Social Work done by you' value={helperData.socialWorkDone} onChange={(e) => formHandler(e)} />
                        <h3>Alternate Phone Number</h3>
                        <input type="text" name="alternatePhoneNumber" placeholder='Alternate Contact Number' value={helperData.alternatePhoneNumber} onChange={(e) => formHandler(e)} />
                        <button type='submit'>Post Notification</button>
                    </form>
                </Box>
            </Modal>
    </Section>
  )
}

export default HelperModal