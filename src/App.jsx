import './App.css'
import React from 'react';
import Navbar from "./Components/Navbar";
// import { BrowserRouter} from 'react-router-dom ';

export default function App() {

  return (
    <>
      <div  className="con">
        <div className='con-p'>
            <Navbar/>
            <Home />
        </div>
      </div>
    </>
  )
}
