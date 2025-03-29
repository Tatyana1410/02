import React from 'react';
import done from '../assets/done-music-collection-svgrepo-com.svg'

function Check(props) {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <img src={done} style={{width:'12%'}} /> The order has been placed!
        </div>
    );
}

export default Check;