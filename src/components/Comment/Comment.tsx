import React, { FC, SyntheticEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Comment as CommentType } from '../../redux/types/comments';
import { updateComment } from '../../redux/slices';
import styles from './Comment.module.scss';

interface CommentProps extends CommentType {
  commentId: string;
}

const Comment: FC<CommentProps> = ({ commentId, treads, coordinates }) => {
  const dispatch = useDispatch();
  const commentRef = useRef<HTMLDivElement>(null);

  const onCommentClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    dispatch(updateComment({ commentId, comment: { status: 'edit' } }));
  };

  return (
    <div
      className={styles['comment-wrap']}
      style={{ left: coordinates.x, top: coordinates.y }}
      onClick={onCommentClick}
      ref={commentRef}
    >
      <div className={styles.comment}>
        {treads[0]}
        {treads.length > 1 && (
          <div className={styles['replies-count']}>
            {`${treads.length - 1} ${treads.length > 2 ? 'replies' : 'reply'}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
