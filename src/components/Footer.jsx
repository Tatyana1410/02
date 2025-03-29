import React, {useState} from 'react';
import {Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

function Footer(props) {

    const nowYear = new Date().getFullYear();
    const [showState, setShowState] = useState(false);
    function changeShowState(){
        setShowState(showState=>!showState);
    }
    
    return (
        <div className='footer'>
        <div className="container">
            <footer className="pt-5 pb-1 my-5">
                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-5 border-bottom'>
                    <div className="col">
                        <Link to={"/home"} className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
                        <h1 style={{color:'black',
                                fontFamily:'fantasy',
                                textAlign:'center'
                                }}>Favorite <br/>Store</h1>
                        </Link>
                        
                    </div>

                    <div className="col"></div>

                    <div className="col">
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to={"/"} className="nav-link p-0 text-body-secondary">Home</Link></li>
                            <li className="nav-item mb-2"><Link to={"/login"} className="nav-link p-0 text-body-secondary">Login</Link></li>
                        </ul>
                    </div>

                    <div className="col">
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary">Favorites</a></li>
                            <li className="nav-item mb-2"><Link to={"/basket"} className="nav-link p-0 text-body-secondary">Basket</Link></li>
                        </ul>
                    </div>

                    <div className="col">
                    
                        <form>
                            <p className="text-body-secondary">Call back</p>
                            <FontAwesomeIcon icon={faPhone} onClick={changeShowState} style={{cursor:'pointer'}}/>
                            {showState &&(
                            <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                                <label  
                                className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" className="form-control" placeholder="Phone"/>
                            </div>)}
                        </form>
                    </div>
                </div>
                <p className="text-center text-body-secondary">© {nowYear}</p>   
            </footer>
        </div>
        </div>
    );
}

export default Footer;