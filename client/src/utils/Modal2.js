import * as React from 'react';
import { Box, Modal, Fade, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'hidden', // Prevent overflow to enable internal scrolling
  display: 'flex', // Ensure the content is flex
  flexDirection: 'column', // Stack children vertically
  maxHeight: '90vh', // Adjust based on your preference
};

export default function TransitionsModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const foodBanks = props.props;

  const ModalList = () => (
    <Box
      sx={{
        overflowY: 'auto', // Enable vertical scrolling for the list
        maxHeight: 'calc(450px - 64px)', // Adjust the maxHeight to accommodate the header's height
      }}
    >
      {foodBanks.map((place, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img
            src={place.icon}
            alt="icon"
            style={{ marginRight: '10px', width: '30px', height: '30px', backgroundColor: place.icon_background_color }}
          />
          <div>
            <div style={{ fontWeight: 'bold' }}>{place.name}</div>
            <div>{place.vicinity}</div>
          </div>
        </div>
      ))}
    </Box>
  );

  return (
    <div style={{ textAlign: 'right', marginTop: '5px' }}>
      <Button className="btn" onClick={handleOpen}>
        <img src={`${process.env.PUBLIC_URL}/bank.png`} alt="Bank" />
        &nbsp;Food Bank
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box justifyContent={'center'} display={'flex'} flexDirection={'row'} alignItems={'center'} mb={2}>
              <img src={`${process.env.PUBLIC_URL}/nearby.png`} alt="Nearby" />
              <Typography variant="h5" fontWeight={'bold'}>&nbsp;Food Banks</Typography>
            </Box>
            <ModalList />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
