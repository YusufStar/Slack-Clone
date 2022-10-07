import React from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Chat from './Chat';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      <Router>
        {
          !user ? (
            <Login />
          ) : (
            <>
            <Header />
          <div className="app__body">
            <Sidebar />

            <Routes>
              <Route path="/room/:roomId" element={<Chat/>} />
            </Routes>
          </div>
          </>
          )}
      </Router>
    </div>
  );
}

export default App;
