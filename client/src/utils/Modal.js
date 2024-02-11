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

const canImages = [
    'can1.png',
    'can2.png',
    'can3.png',
    'can4.png',
    'can5.png',
    'can6.png',
    'can7.png',
    'can8.png',
  ];

export default function TransitionsModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const foods = props.foods;
  const donatableItems = foods.filter(food => food.is_donatable);

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * canImages.length);
    return `${process.env.PUBLIC_URL}/cans/${canImages[randomIndex]}`;
  };

  const ModalList = () => (
    <Box
      sx={{
        overflowY: 'auto', // Enable vertical scrolling for the list
        maxHeight: 'calc(450px - 64px)', // Adjust the maxHeight to accommodate the header's height
      }}
    >
      {donatableItems.map((item, index) => (
        <div key={item.index} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img
            src={getRandomImage()} 
            alt="Can"
            style={{ marginRight: '10px', width: '30px', height: '30px'}}
          />
          <div>
            <div style={{ fontWeight: 'bold' }}>{item.product}</div>
            <div>{"Expired by " + item.exp_date}</div>
          </div>
        </div>
      ))}
    </Box>
  );

  return (
    <div style={{ textAlign: 'right', marginTop: '5px' }}>
      <Button className="btn" onClick={handleOpen}>
        <img src={`${process.env.PUBLIC_URL}/bread.png`} alt="Bread" />
        &nbsp;Donatable Foods
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
              <img src={`${process.env.PUBLIC_URL}/diet.png`} alt="Diet" />
              <Typography variant="h5" fontWeight={'bold'}>&nbsp;Food Banks</Typography>
            </Box>
            <ModalList />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
