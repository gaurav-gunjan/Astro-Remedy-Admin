import { Button, Container, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React from 'react'

const ViewModal = ({ openModal, title, description, handleCloseModal }) => {
    return (
        <Dialog open={openModal} onClose={handleCloseModal} PaperProps={{ sx: { maxWidth: { xs: '90vw', sm: '50vw' }, minWidth: { xs: '90vw', sm: '50vw' } } }}>
            <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
                <div>{title}</div>
                <Button onClick={handleCloseModal}>Cancel</Button>
            </DialogTitle>
            <Container>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </Container>
        </Dialog>
    )
}

export default ViewModal;