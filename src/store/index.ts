import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AnyAction, Dispatch, ThunkDispatch, combineSlices, configureStore } from '@reduxjs/toolkit'

import { appSlice } from './slices/auth.slice'

const rootReducer = combineSlices(appSlice)

const store = configureStore({
  reducer: rootReducer,
})

type TRootState = ReturnType<typeof store.getState>

type AppDispatch = ThunkDispatch<any, undefined, AnyAction> & Dispatch<any>

const useAppDispatch: () => AppDispatch = useDispatch
const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector

export type { TRootState }

export { store, useAppDispatch, useAppSelector }
