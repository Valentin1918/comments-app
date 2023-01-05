import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getComments, initiateComment, clearWarned } from './redux/slices';
import { Comment, CommentDraft, CommentEdit, ResolveSuccessDialog } from './components';
import styles from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const comments = useSelector(getComments);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const showSuccessModal = () => {
    setOpenSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setOpenSuccessModal(false);
  };

  const clickEventListener = (event: MouseEvent) => {
    dispatch(initiateComment({ x: event.x, y: event.y }));
    setTimeout(() => dispatch(clearWarned()), 600);
  };

  useEffect(() => {
    document.addEventListener('click', clickEventListener);
    return () => document.removeEventListener('click', clickEventListener);
  }, []);

  return (
    <div className={styles.wrap}>
      {Object.entries(comments).map(([commentId, commentProps]) => {
        if (commentProps.status === 'resolved') {
          return null;
        }

        if (commentProps.status === 'draft') {
          return <CommentDraft key={commentId} commentId={commentId} {...commentProps} />;
        }

        if (commentProps.status === 'edit') {
          return (
            <CommentEdit key={commentId} commentId={commentId} {...commentProps} showSuccessModal={showSuccessModal} />
          );
        }

        return <Comment key={commentId} commentId={commentId} {...commentProps} />;
      })}

      <ResolveSuccessDialog open={openSuccessModal} handleClose={closeSuccessModal} />
    </div>
  );
}

export default App;
