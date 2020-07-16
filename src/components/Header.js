import React from 'react';

import { Link } from 'react-router-dom'
import GoogleAuth from './GoogleAuth';


const Header = () => {
    return (
        <div className="ui secondary pointing menu" style = {{paddingTop:'1rem'}}>

            <Link to="/" className = "item" style = {{marginBottom: '-8px'}}>
                <h1 style = {{color:'red'}}>StreamZ</h1>
            </Link>
            <div className="right menu">
                <Link to = "/" className = "item " >
                    <h4>All Streams</h4> 
                </Link>
                <GoogleAuth />
            </div>
        </div>
    );
}

export default Header;
