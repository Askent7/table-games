

import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';



import reportWebVitals from './reportWebVitals';
import App from "./App";
import UserStore from "./store/userStore";
import gameStorage from "./store/gameStorage";


export const Context = createContext(null)



ReactDOM.render(
    <Context.Provider value={{user: new UserStore(), game: new gameStorage(), popular: new gameStorage(), search: new gameStorage(), category: new gameStorage()}}>
        <App/>
    </Context.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
