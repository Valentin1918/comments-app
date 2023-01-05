import React, { FC, SyntheticEvent, useRef, useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { DeleteOutlineRounded, CheckCircleOutlineRounded, CloseRounded } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { ConfirmDeleteDialog, Writer } from '../index';
import { updateComment, deleteComment } from '../../redux/slices';
import { Comment as CommentType } from '../../redux/types/comments';
import { uniqueId } from '../../utils';
import styles from './CommentEdit.module.scss';

interface CommentProps extends CommentType {
  commentId: string;
  showSuccessModal: () => void;
}

const CommentEdit: FC<CommentProps> = ({ commentId, treads, coordinates, draft = '', warned, showSuccessModal }) => {
  const dispatch = useDispatch();
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleDeleteClick = () => {
    setOpenConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  const handleSubmitConfirmModal = () => {
    removeComment();
    handleCloseConfirmModal();
  };

  const handleResolveClick = () => {
    resolveComment();
    showSuccessModal();
  };

  const commentRef = useRef<HTMLDivElement>(null);

  const keydownEventListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeEditMode();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownEventListener);
    return () => document.removeEventListener('keydown', keydownEventListener);
  }, []);

  const removeComment = () => {
    dispatch(deleteComment({ commentId }));
  };

  const resolveComment = () => {
    dispatch(updateComment({ commentId, comment: { status: 'resolved' } }));
  };

  const closeEditMode = () => {
    dispatch(updateComment({ commentId, comment: { status: 'active', draft: '' } }));
  };

  const onCommentClick = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  const handleSubmit = useCallback(() => {
    if (draft.length) {
      dispatch(updateComment({ commentId, comment: { treads: treads.concat(draft), draft: '' } }));
    }
  }, [commentId, draft]);

  return (
    <div
      className={clsx(styles['comment-wrap'], { [styles.wiggle]: warned })}
      style={{ left: coordinates.x, top: coordinates.y }}
      onClick={onCommentClick}
    >
      <div className={styles.comment} ref={commentRef}>
        <div className={styles['comment-header']}>
          <Tooltip title="Delete" arrow placement="top">
            <DeleteOutlineRounded className={styles['icon-button']} onClick={handleDeleteClick} />
          </Tooltip>
          <Tooltip title="Resolve" arrow placement="top">
            <CheckCircleOutlineRounded className={styles['icon-button']} onClick={handleResolveClick} />
          </Tooltip>
          <CloseRounded className={styles['icon-button']} onClick={closeEditMode} />
        </div>

        {treads.map((tread) => (
          <div className={styles.tread} key={uniqueId()}>
            {tread}
          </div>
        ))}

        <Writer {...{ commentId, draft, warned, handleSubmit, placeholder: 'Reply' }} />
      </div>
      <ConfirmDeleteDialog
        open={openConfirmModal}
        handleClose={handleCloseConfirmModal}
        handleSubmit={handleSubmitConfirmModal}
      />
    </div>
  );
};

export default CommentEdit;
