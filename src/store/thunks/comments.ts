import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../../const';
import {CommentData} from '../../types/comment-data';

export const fetchCommentsAction = createAsyncThunk<Comment[], {id: string}, {extra: AxiosInstance}>
(
  'data/fetchOfferComments',
  async ({id}, {extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const submitCommentAction = createAsyncThunk<Comment, CommentData, {extra: AxiosInstance}>
(
  'data/submitOfferComment',
  async ({id, comment, rating}, {extra: api}) => {
    const {data} = await api.post<Comment>(`${APIRoute.Comments}/${id}`, {comment, rating});
    return data;
  },
);
