import React, { FC } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import Popover from '@mui/material/Popover';
import styles from './EmojiDialog.module.scss';

interface EmojiDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  onEmojiClick: (emoji: { native: string }) => void;
  anchorEl: null | Element;
}

const EmojiDialog: FC<EmojiDialogProps> = ({ open, onClose, onEmojiClick, anchorEl }) => (
  <Popover
    open={open}
    anchorEl={anchorEl}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    className={styles['emoji-dialog']}
  >
    <Picker data={data} onEmojiSelect={onEmojiClick} className={styles['emoji-picker']} />
  </Popover>
);

export default EmojiDialog;
