import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        app: appSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();