import React, {useState, useEffect, useMemo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Header(props) {
    const [prod,setProd]=useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showState, setShowState] = useState(false);
    useEffect(()=>{
                  fetch ("https://api.escuelajs.co/api/v1/products")
                  .then((resp) => {
                    if (!resp.ok) {
                        throw new Error('Failed to fetch products');
                    }
                    return resp.json();
                })
                .then((data) => {
                    setProd(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError(err.message);
                    setLoading(false);
                });
        }, []);
    
    function changeShowState(){
        setShowState(showState=>!showState);
    }

    const [searchValue, setSearchValue]=useState('');
   
    const filtered = useMemo(() => {
        return prod.filter((product) =>
            product.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [searchValue, prod]);

    const itemClick = (e)=>{
        setSearchValue('')
        setShowState(!showState)
    }
    const inputClick = ()=>{
        setShowState(true)
    }
    if (loading) {
        return <p>Загрузка продуктов...</p>;
    }       
    if (error) {
        return <p>Ошибка загрузки: {error}</p>;}
    
    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
                <div className="d-flex col-md-3 mb-2 mb-md-0 position-relative">
                    <button className='btn'><FontAwesomeIcon icon={faMagnifyingGlass} className='icon' onClick={changeShowState}/></button>
                    {showState ?
                        <form className="col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto position-absolute" role="search">
                            <input type="search" className="form-control mx-2" placeholder="Search..." aria-label="Search"
                            autoComplete='off'
                            value={searchValue}
                            onClick = {inputClick}
                            onChange={(e) => setSearchValue(e.target.value)}/>
                            <ul>
                   {searchValue && showState ? 
                   filtered.map((product, index)=>{
                        return (
                            <div key ={index} 
                            style={{
                            backgroundColor:'rgb(231, 231, 231)',
                            border:'solid rgb(225, 222, 222) 1px',
                            }}>
                                <Link 
                                    to={`/products/${product.id}`} 
                                    key ={prod.id}
                                    onClick={itemClick}
                                    style={{listStyle:'none',
                                        textDecoration:'none',
                                        color:'black',
                                        padding:'5px'
                                    }}>
                                    {product.title}
                                </Link>
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
                    <button type="button" className="btn me-2"><Link to={'/user'} style={{color:'black'}}><FontAwesomeIcon icon={faUser} className='icon'/></Link></button>
                    <button type="button" className="btn me-2"><Link to={'/user'} style={{color:'black'}}><FontAwesomeIcon icon={faHeart} className='icon'/></Link></button>
                   <button type="button" className="btn"><Link to={'/basket'} style={{color:'black'}}><FontAwesomeIcon icon={faBasketShopping} className='icon'/></Link></button>
                </div>
            </header>
        </div>
        
    );
}

export default Header;