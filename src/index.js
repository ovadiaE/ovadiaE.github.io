import React from 'react';
import { render } from "react-dom";
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import weatherApp from './store/likes/likes'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Favorites from './components/Favorites/Favorites'
import HomePage from './components/Homepage/HomePage'

const store = createStore(weatherApp)

const rootElement = document.getElementById("root");

render (
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
        <Routes> 
            <Route path ="/" element={<App/>}/>
            <Route path ="Favorites" element={<Favorites/>}/>
            <Route path ="Homepage" element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);