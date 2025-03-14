import React, {useState, useEffect} from 'react';
import Sorting from '../components/Sorting';
import Block from '../components/Block';


function Section({prod, selectProd, selectFavorite, loadMore}) {
   
   
     
    return (
        <>
        <div className='container'>
            <Sorting/>
            <div className='row justify-content-between'>
                 {prod.map((obj)=>( 
            <Block key={obj.id} {...obj} selectProd={selectProd} selectFavorite={selectFavorite} /> 
                ))} 
            </div>
            <button className='btn btn-lg btn-secondary my-4' style={{width:'100%'}} onClick={loadMore}>Load more</button>
        </div>   
        </>
    );
}

export default Section;