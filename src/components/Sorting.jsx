import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sorting(props) {
    const [visible, setVisible] = useState(false);
    const toggleVisible = ()=>setVisible (!visible);
    
    
    return (
        <>
            <div className='row'>
                <div>
                    <p className='text-end'>Sort by  
                        <span className='sort' onClick={toggleVisible}> title</span>:
                    </p>
                </div>
            
            {visible &&
                <div>
                    <ul className="nav flex-column mb-auto text-end">
                        <li><Link to={`/filter-price`}>price</Link></li>
                        <li><Link to={`/filter-price-range`}> price range</Link></li>
                        <li>category</li>
                    </ul>
                </div>
                }
            </div>

           

        </>
    );
}

export default Sorting;