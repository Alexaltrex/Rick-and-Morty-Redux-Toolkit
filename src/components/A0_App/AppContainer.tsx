import {App} from "./App";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../../store/store";
import {HashRouter} from "react-router-dom";

export const AppContainer = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>
    )
}