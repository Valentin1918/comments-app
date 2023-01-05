import React, { FC } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface ConfirmDeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}

const ConfirmDeleteDialog: FC<ConfirmDeleteDialogProps> = ({ open, handleClose, handleSubmit }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Are you sure?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this comment? This will delete all of its replies as well.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} size="small">
        Cancel
      </Button>
      <Button onClick={handleSubmit} size="small" autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDeleteDialog;
