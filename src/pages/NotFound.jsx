import React from 'react';
import { Link } from 'react-router-dom';
import imageError from '../assets/404-error.svg'
import { text } from '@fortawesome/fontawesome-svg-core';

function NotFound(props) {
    return (
        <div>
            <div className="container">
                <img src={imageError} alt="404" style={{width:'100%'}}/>
                <div className='text-center fs-3 mt-3'>
                <Link to ="/" className='text-decoration-none text-dark'>Back to main</Link>
                </div>
                
            </div>
        </div>
    );
}

export default NotFound;