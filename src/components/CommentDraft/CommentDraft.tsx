import React, { FC, SyntheticEvent, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { clearDraftComments, updateComment } from '../../redux/slices';
import { Comment as CommentType } from '../../redux/types/comments';
import { Writer } from '../index';
import styles from './CommentDraft.module.scss';

interface CommentProps extends CommentType {
  commentId: string;
}

const CommentDraft: FC<CommentProps> = ({ commentId, coordinates, draft = '', warned }) => {
  const dispatch = useDispatch();

  const keydownEventListener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      dispatch(clearDraftComments());
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownEventListener);
    return () => document.removeEventListener('keydown', keydownEventListener);
  }, []);

  const onCommentClick = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  const handleSubmit = useCallback(() => {
    if (draft.length) {
      dispatch(updateComment({ commentId, comment: { status: 'active', treads: [draft], draft: '' } }));
    }
  }, [commentId, draft]);

  return (
    <div
      className={clsx(styles['comment-wrap'], { [styles.wiggle]: warned })}
      style={{ left: coordinates.x, top: coordinates.y }}
      onClick={onCommentClick}
    >
      <Writer {...{ commentId, draft, handleSubmit, placeholder: 'Add a comment' }} />
    </div>
  );
};

export default CommentDraft;
