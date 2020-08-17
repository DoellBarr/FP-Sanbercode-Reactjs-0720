import React from "react"
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Header"
import Footer from "./Footer"


const Main = () =>{
  return(
    <>
      <Router>        
        <Header/>
        <Footer/>
      </Router>
    </>
  )
}

export default Main