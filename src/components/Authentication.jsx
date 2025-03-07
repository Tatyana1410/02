import React, { useState, useEffect, createContext} from 'react';
import Register from './Register';
import { useNavigate,useLocation, data, Link } from 'react-router-dom';

export const AuthContext=createContext();

function Authentiation({selectedProduct}) {

const[email, setEmail]= useState('');
const[password, setPassword] =useState('');
const[isSubmit, setIsSubmit]=useState(false);
const [isAuthenticated, setAuth] = useState(false);


const handleSubmit=(event)=>{
    event.preventDefault()
    setIsSubmit(true)}

function saveEmail(e){
    setEmail(e.target.value)
}
function savePassword(e){
    setPassword(e.target.value)
}

  

useEffect(()=>{
    if(!isSubmit){return}
    fetch('https://api.escuelajs.co/api/v1/auth/login',{
    method:'post',
    body: JSON.stringify({
        email:`${email}`,
        password:`${password}`
    }),
    headers: {
        'Content-Type': 'application/json'
    },})
    .then(response=>response.json())
    .then(data=>(localStorage.setItem('token', data.access_token)));
},[isSubmit]);



     
const navigate = useNavigate();
const location=useLocation();
const from = location.state?.from.pathname || '/';


useEffect(()=>{
    if(localStorage.getItem('id')){
        setAuth(true)
        navigate(from, { replace: true })
        console.log(isAuthenticated)
    }
},[])

console.log(selectedProduct)


    return (
        <>
              <AuthContext.Provider value={{ isAuthenticated, setAuth }}>  </AuthContext.Provider>

      {!isSubmit ?
        <div className='container'>
            <div className='row border-black'>
                <div className='col-md-6 offset-md-3 col-xs-12 p-md-3 rouded-4 shadow'>
                    <h2 className='text-xs-center'>
                        Login
                    </h2>
                    <fieldset>
                    <form onSubmit={handleSubmit}>
                        <fieldset className='form-group'>
                            <input type='email'
                            className='form-control form-control-lg mb-3'
                            placeholder='Email'
                            value={email}
                            onChange={saveEmail}/>
                        </fieldset>
                        <fieldset className='form-group'>
                            <input type="password" 
                            className="form-control form-control-lg mb-3"
                            placeholder='Password'
                            value={password}
                            onChange={savePassword}/>
                        </fieldset>
                    
                    
                    <button className='btn btn-secondary col-md-5 pull-xs-right'
                    type='submit'>Sign in</button>
                    </form>
                    </fieldset>
                    <p style={{fontSize:'18px',
                        textAlign:'end'
                    }}> <Link to = {'/register'}>Registration?</Link></p>
                   
                </div>
            </div>
            
        </div>
        :<Register/>}
              

        </>
    );
}

export default Authentiation;