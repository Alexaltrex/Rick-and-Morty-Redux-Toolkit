import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {ISnackbar} from "../types/app.types";
import {AlertColor} from "@mui/material";

const initialState = {
    burgerMenu: false,
    snackbar: {
        open: false,
        message: "",
        severity: "success" as AlertColor
    }
}

export type InitialStateType = typeof initialState

export const appSlice = createSlice({
    name: "app",
    initialState: initialState as InitialStateType,
    reducers: {
        setBurgerMenu: (state, action: PayloadAction<boolean>) => {
            state.burgerMenu = action.payload
        },
        setSnackbar: (state, action: PayloadAction<ISnackbar>) => {
            state.snackbar = action.payload
        }
    }
})

export const {
    setBurgerMenu,
    setSnackbar,
} = appSlice.actions

export const selectBurgerMenu = (state: RootState) => state.app.burgerMenu;
export const selectSnackbar = (state: RootState) => state.app.snackbar;

export const appReducer = appSlice.reducer