import React, { useState, useRef, useEffect } from 'react';

function Sorting(props) {
    const [visible, setVisible] = useState(false);
    const toggleVisible = ()=>setVisible (!visible);
    
    
;    
    
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
                        <li>price</li>
                        <li>price range</li>
                        <li>category</li>
                    </ul>
                </div>
                }
            </div>
        </>
    );
}

export default Sorting;