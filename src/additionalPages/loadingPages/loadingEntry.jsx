import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import './../../index.css'
import App from './loadingApp.jsx'
//import store from './stateManagement/reduxStore.js';
//import { Provider } from 'react-redux';

window.onload = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
  )
}