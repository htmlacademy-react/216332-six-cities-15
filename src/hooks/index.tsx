import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {State, AppDispatch} from '../types/state';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  extra: AxiosInstance;
}>();
