import React, { Component } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './Home.jsx';
// import About from './About.jsx';

class Body extends Component {
    render() {
        return <Router>
                    <Routes>
                        <Route path='/Home' element={<Home/>}> </Route>
                        {/* <Route path='/About' element={<About/>}> </Route> */}
                    </Routes>
                </Router> ;  
    }
}

export default Body;