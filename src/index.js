import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./utils/apolloClient/client";
import { store } from "./state/index.js";
import { Provider } from "react-redux";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={apolloClient}>
                <App />
            </ApolloProvider>
        </Provider>
    </React.StrictMode>
);
