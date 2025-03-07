import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link} from 'react-router-dom';


function Header(props) {
    useEffect(()=>{
                  fetch ("https://api.escuelajs.co/api/v1/products")
                  .then (resp=>resp.json())
                  .then (data=>setProd(data))
                },[]);

    const [prod,setProd]=useState([]);
    let arr = prod.map(item=>item.title)
    // let arrId = prod.map(item=>item.id)        
    // const[idProd,setIdProd]=useState([]);

    
    const [showState, setShowState] = useState(false);
    function changeShowState(){
        setShowState(showState=>!showState);
    }

    const [searchValue, setSearchValue]=useState('');
    const filtered = arr.filter(item => {
        return item.toLowerCase().includes(searchValue.toLowerCase());
    })

    const itemClick = (e)=>{
        setSearchValue(e.target.value)
        setShowState(!showState)
    }
    const inputClick = ()=>{
        setShowState(true)
    }
    
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
                <div className="d-flex col-md-3 mb-2 mb-md-0">
                    <button className='btn'><FontAwesomeIcon icon={faMagnifyingGlass} className='icon' onClick={changeShowState}/></button>
                    {showState ?
                        <form className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto" role="search">
                            <input type="search" className="form-control mx-2" placeholder="Search..." aria-label="Search"
                            autoComplete='off'
                            value={searchValue}
                            onClick = {inputClick}
                            onChange={(e) => setSearchValue(e.target.value)}/>
                            <ul>
                   {
                   searchValue && showState ? 
                   filtered.map((product, index)=>{
                        return (
                            <div>
                                <li 
                                    // to={`https://api.escuelajs.co/api/v1/products/${id}/>`} 
                                    key ={index}
                                    onClick={itemClick}>
                                    {product}
                                </li>
                            </div>
                            )
                     })
                    :null
                    }
                </ul>
                        </form>
                    :null}
                        
                    
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"> 
                    {/* <li><Link to={'/home'} class="nav-link px-2 link-secondary">Name</Link></li> */}
                    <li>
                        <Link to={'/'} className="nav-link px-2">
                        
                            <h1 style={{color:'black',
                            fontFamily:'fantasy',
                            textAlign:'center'
                            }}>Favorite <br/>Store</h1>
                        </Link>
                        </li>
                </ul>

                <div className="col-md-3 text-end">
                    <button type="button" className="btn me-2"><FontAwesomeIcon icon={faUser} className='icon'/></button>
                    <button type="button" className="btn me-2"><FontAwesomeIcon icon={faHeart} className='icon'/></button>
                   <button type="button" className="btn"><Link to={'/basket'} style={{color:'black'}}><FontAwesomeIcon icon={faBasketShopping} className='icon'/></Link></button>
                </div>
            </header>
        </div>
        
    );
}

export default Header;