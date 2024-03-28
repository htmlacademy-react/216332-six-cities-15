import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, RequestsStatus} from '../../const';
import {fetchCommentsAction, submitCommentAction} from '../thunks/comments';
import {CommentsData} from '../../types/state';

const initialState: CommentsData = {
  comments: [],
  status: RequestsStatus.Idle,
  hasError: false,
};

export const commentsData = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.status = RequestsStatus.Loading;
        state.hasError = false;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.status = RequestsStatus.Success;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.status = RequestsStatus.Failed;
        state.hasError = true;
      })
      .addCase(submitCommentAction.pending, (state) => {
        state.status = RequestsStatus.Loading;
        state.hasError = false;
      })
      .addCase(submitCommentAction.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.status = RequestsStatus.Success;
      })
      .addCase(submitCommentAction.rejected, (state) => {
        state.status = RequestsStatus.Failed;
        state.hasError = true;
      });
  },
  selectors: {
    comments: (state: CommentsData) => state.comments,
    commentsStatus: (state: CommentsData) => state.status,
    commentsErrors: (state: CommentsData) => state.hasError,
  }
});
