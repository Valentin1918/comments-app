import React, { FC, SyntheticEvent } from 'react';
import { ThumbUpOutlined } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import styles from './ResolveSuccessDialog.module.scss';

interface ConfirmDeleteDialogProps {
  open: boolean;
  handleClose: () => void;
}

const ResolveSuccessDialog: FC<ConfirmDeleteDialogProps> = ({ open, handleClose }) => {
  const onDialogClick = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  return (
    <Dialog open={open} onClose={handleClose} className={styles['success-dialog']} onClick={onDialogClick}>
      <DialogTitle>Comment tread was resolved!</DialogTitle>
      <DialogContent>
        <ThumbUpOutlined className={styles['success-icon-button']} color="success" />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} size="medium" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResolveSuccessDialog;
