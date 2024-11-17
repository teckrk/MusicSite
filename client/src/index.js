import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the new createRoot API
import App from './App';
import { StateProvider } from "./context/StateProvider";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root
root.render(
    <Router>
        <StateProvider initialState={initialState} reducer={reducer}>
            <App />
        </StateProvider>
    </Router>
); // Render your app into the root
