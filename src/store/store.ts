import {configureStore} from '@reduxjs/toolkit'
import {appReducer} from "./appSlice";
import logger from 'redux-logger';
import {charactersApi} from "../api/characters.api";
import {productsApi} from "../api/products.api";
import {locationsApi} from "../api/locations.api";
import {episodesApi} from "../api/episodes.api";

const isProduction = process.env.NODE_ENV === 'production';

export const store = configureStore({
    //object of slice reducers that will be passed to `combineReducers()`
    reducer: {
        [charactersApi.reducerPath]: charactersApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [locationsApi.reducerPath]: locationsApi.reducer,
        [episodesApi.reducerPath]: episodesApi.reducer,
        app: appReducer
    },
    // An array of Redux middleware to install
    middleware: (getDefaultMiddleware) => isProduction
        ? getDefaultMiddleware()
        : getDefaultMiddleware().concat(
            //logger,
            charactersApi.middleware,
            productsApi.middleware,
            locationsApi.middleware,
            episodesApi.middleware,
        ),
    // Whether to enable Redux DevTools integration. Defaults to `true`
    devTools: !isProduction,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

