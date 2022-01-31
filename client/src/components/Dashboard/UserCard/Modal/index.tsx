import * as React from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { AiOutlineDelete } from 'react-icons/ai';
import './styles.scss';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: '#111111',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};
interface Props {
  handleDeleteJob: () => void;
  job: string | undefined;
}

const DeleteJobModal: React.FC<Props> = ({ handleDeleteJob, job }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        <AiOutlineDelete />
      </button>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <h2 id="unstyled-modal-title" style={{ marginBottom: '1rem' }}>
            Are you sure you want to delete {job}?
          </h2>
          <span className="modal-button" onClick={handleDeleteJob}>
            Yes
          </span>
          <span className="modal-button" onClick={handleClose}>
            No
          </span>
        </Box>
      </StyledModal>
    </div>
  );
};

export default DeleteJobModal;
