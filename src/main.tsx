import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@gravity-ui/uikit/styles/styles.css';
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import {ThemeProvider} from "@gravity-ui/uikit";
import styled from "styled-components";

const AppContainer = styled.div`
    margin-left: 33%;
    max-width: 650px;
`

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <ThemeProvider theme="dark">
            <AppContainer>
                <App />
            </AppContainer>
        </ThemeProvider>
    </Provider>
)
