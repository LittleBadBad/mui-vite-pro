import React, {Fragment} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import GlobalThemeProvider from "@/context/theme";
import {CssBaseline} from "@mui/material";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Fragment>
        <CssBaseline/>
        <BrowserRouter>
            <GlobalThemeProvider>
                <App/>
            </GlobalThemeProvider>
        </BrowserRouter>
    </Fragment>,
)
