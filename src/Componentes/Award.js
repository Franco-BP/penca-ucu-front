import React, { useState } from 'react';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Awards from '../assets/PencaUCUU.png';

const Award = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <img
        src={Awards}
        alt="Premios"
        style={{ cursor: 'pointer', width: '200px', height: 'auto' }}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography id="modal-title" variant="h6" component="h2">
            Información de los Premios
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            <strong>Premio al Primer Puesto:</strong> Camiseta autografiada por los jugadores de la selección.
            <br /><br />
            <strong>Premio al Segundo Puesto:</strong> Pelota similar a la que se utilizará en la Copa.
            <br /><br />
            <strong>Nota:</strong> El puesto final de todos los participantes se obtendrá mediante un listado de puntos conseguidos durante toda la Copa.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Award;
