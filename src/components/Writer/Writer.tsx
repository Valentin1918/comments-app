import React, { FC, useState, useRef, ChangeEvent, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { ArrowCircleUpOutlined, SentimentSatisfiedRounded } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { updateComment } from '../../redux/slices';
import { useAutosizeTextArea } from '../../hooks';
import { EmojiDialog } from '../index';
import styles from './Writer.module.scss';

const initialSelectedRange = { selectionStart: 0, selectionEnd: 0 };

interface WriterProps {
  commentId: string;
  draft: string;
  handleSubmit: () => void;
  placeholder?: string;
}

const Writer: FC<WriterProps> = ({ commentId, draft = '', handleSubmit, placeholder = '' }) => {
  const dispatch = useDispatch();
  const [openEmojiDialog, setOpenEmojiDialog] = useState(false);
  const [selectedRange, setSelectedRange] = useState(initialSelectedRange);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);

  useAutosizeTextArea(textAreaRef.current, draft);

  useEffect(() => {
    if (textAreaRef?.current) {
      textAreaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (textAreaRef?.current && textAreaRef?.current !== document.activeElement) {
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(selectedRange.selectionStart, selectedRange.selectionEnd);
    }
  }, [draft]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateComment({ commentId, comment: { draft: e.target?.value } }));
  };

  const onEmojiButtonClick = () => {
    setOpenEmojiDialog(true);
  };

  const closeEmojiDialog = () => {
    setOpenEmojiDialog(false);
  };

  const onEmojiClick = useCallback(
    (emoji: { native: string }) => {
      if (emoji.native) {
        const { selectionStart, selectionEnd } = textAreaRef.current || initialSelectedRange;

        dispatch(
          updateComment({
            commentId,
            comment: {
              draft: `${draft.slice(0, selectionStart)}${emoji.native}${draft.slice(selectionEnd)}`,
            },
          })
        );

        setSelectedRange({ selectionStart, selectionEnd });
      }

      closeEmojiDialog();
    },
    [commentId, draft]
  );

  const onSubmitClick = () => {
    handleSubmit();
    if (textAreaRef?.current) {
      textAreaRef.current.focus();
    }
  };

  return (
    <div className={styles.writer} ref={commentRef}>
      <div className={styles['input-wrap']}>
        <textarea
          placeholder={placeholder}
          className={styles.input}
          rows={1}
          onChange={handleChange}
          ref={textAreaRef}
          value={draft}
        />
      </div>

      <div className={styles['writer-footer']}>
        <Tooltip title="Add emoji" arrow>
          <SentimentSatisfiedRounded
            className={clsx(styles['icon-button'], { [styles.active]: openEmojiDialog })}
            onClick={onEmojiButtonClick}
          />
        </Tooltip>
        <Tooltip title="Submit" arrow>
          <ArrowCircleUpOutlined
            className={clsx(styles['icon-button'], { [styles.disabled]: !draft.length })}
            onClick={onSubmitClick}
          />
        </Tooltip>
      </div>
      <EmojiDialog
        onClose={closeEmojiDialog}
        open={openEmojiDialog}
        onEmojiClick={onEmojiClick}
        anchorEl={commentRef.current}
      />
    </div>
  );
};

export default Writer;
