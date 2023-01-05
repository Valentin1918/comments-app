import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { uniqueId } from '../../utils';
import { Comment, CommentCoordinates, CommentsState } from '../types/comments';

const initialState: CommentsState = {};
const initialComment: Comment = {
  status: 'draft',
  treads: [],
  coordinates: { x: 0, y: 0 },
  draft: '',
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    initiateComment: (state, action: PayloadAction<CommentCoordinates>) => {
      let commentHandled = false;

      Object.entries(state).forEach(([commentId, comment]) => {
        if (comment.status === 'draft') {
          commentHandled = true;

          if (comment.draft) {
            state[commentId].warned = true;
          } else {
            delete state[commentId];
          }
        }

        if (comment.status === 'edit') {
          commentHandled = true;

          if (comment.draft) {
            state[commentId].warned = true;
          } else {
            comment.status = 'active';
          }
        }
      });

      if (!commentHandled) {
        Object.assign(state, { [uniqueId()]: { ...initialComment, coordinates: action.payload } });
      }
    },
    updateComment: (state, action: PayloadAction<{ commentId: string; comment: Partial<Comment> }>) => {
      Object.assign(state, {
        [action.payload.commentId]: { ...(state[action.payload.commentId] || {}), ...action.payload.comment },
      });
    },
    deleteComment: (state, action: PayloadAction<{ commentId: string }>) => {
      delete state[action.payload.commentId];
    },
    clearWarned: (state) => {
      Object.entries(state).forEach(([commentId, comment]) => {
        if (comment.warned) {
          delete state[commentId].warned;
        }
      });
    },
    clearDraftComments: (state) => {
      Object.entries(state).forEach(([commentId, comment]) => {
        if (comment.status === 'draft') {
          delete state[commentId];
        }
      });
    },
  },
});

export const { initiateComment, updateComment, deleteComment, clearWarned, clearDraftComments } = commentsSlice.actions;

export const getComments = ({ comments }: { comments: CommentsState }) => comments;

export const { reducer: commentsReducer } = commentsSlice;
