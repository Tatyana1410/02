import React, {useState, useEffect} from 'react';
import Sorting from '../components/Sorting';
import Block from '../components/Block';

function Section({prod, selectProd}) {
   
   
     
    return (
        <>
        <div className='container'>
            <Sorting/>
            <div className='row justify-content-between'>
                 {prod.map((obj)=>( 
            <Block key={obj.id} {...obj} selectProd={selectProd} /> 
                ))} 
            </div>
        </div>
        </>
    );
}

export default Section;