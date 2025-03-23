import React, { useState } from 'react';
import SidebarList from './SidebarList';

function Sidebar() {
    
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
                };

    return (
         <>
         <div className='d-md-none'>
            <div className='d-flex '>
                <button className="hamburger-button" onClick={toggleMenu}>☰</button>
            </div>
            {isOpen &&(
            <SidebarList/> 
            )}
        </div>
        
        <div className='d-none d-md-flex'>
            <SidebarList/>
        </div>
        </>
        
    );
}

export default Sidebar;