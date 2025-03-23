import React, {useState, useEffect, useMemo, useRef} from 'react';
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
    const searchBoxRef = useRef(null);

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
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
                setSearchValue(""); 
                setShowState(false); 
            }
        };

        document.addEventListener("mousedown", handleOutsideClick); // Добавляем слушатель кликов
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick); // Убираем слушатель при размонтировании
        };
    }, []);

    const [searchValue, setSearchValue]=useState('');
   
    const filtered = useMemo(() => {
        return prod.filter((product) =>
            product.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [searchValue, prod]);
    console.log(filtered)

    if (loading) {
        return <p>Loading Products...</p>;
    }       
    if (error) {
        return <p>Loading error: {error}</p>;}
    
    return (
        <section className='header'>
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between pt-3 mb-4">
                    <div className="d-flex col-md-3 mb-md-0 ">
                        <button className='btn'><FontAwesomeIcon icon={faMagnifyingGlass} className='icon' onClick={changeShowState}/></button>
                        {showState ?
                            <form className="col-6 col-lg-auto mb-lg-0 me-lg-auto position-absolute" role="search" ref={searchBoxRef}>
                                <input type="search" className="form-control mx-2" placeholder="Search..." aria-label="Search"
                                autoComplete='off'
                                value={searchValue}
                                onFocus={() => setShowState(true)}
                                onChange={(e) => setSearchValue(e.target.value)}/>
                                    <div className='search-results col-lg-auto mb-2 mb-lg-0 me-lg-auto'>
                                        {searchValue && showState ? 
                                         filtered.map((product, index)=>{
                                            return (
                                                <ul key ={index} >
                                                    <Link 
                                                    to={`/products/${product.id}`} 
                                                    onClick={()=>{
                                                        setSearchValue("");
                                                        setShowState(false);
                                                    }}
                                                    style={{
                                                    textDecoration:'none',
                                                    color:'black',
                                                    }}>
                                                        <img src={product.images[0]} style={{width:'30px'}} />
                                                        &ensp;{product.title} 
                                                    </Link>
                                                </ul>
                                                 )
                                             })
                                        :null
                                        }
                                    </div>
                            </form>
                        :null}
                     </div>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0"> 
                        <li>
                            <Link to={'/'} className="nav-link px-2">
                                <h1>Favorite <br/>Store</h1>
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
        </section>
        
    );
}

export default Header;