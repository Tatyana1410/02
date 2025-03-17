import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

function Register(props) {

    const[userName, setUserName]=useState('');
    const[email, setEmail]= useState('');
    const[password, setPassword] =useState('');
    const[isSubmit, setIsSubmit]=useState(false);
    
    function saveUserName(e){
        setUserName(e.target.value)
    }
    function saveEmail(e){
        setEmail(e.target.value)
    }
    function savePassword(e){
        setPassword(e.target.value)
    }
   
    const handleSubmit=(event)=>{
        event.preventDefault()
        setIsSubmit(true)
    }
    

    useEffect(()=>{
        if(!isSubmit){return}
        fetch("https://api.escuelajs.co/api/v1/users/",{
        method:'POST',
        body: JSON.stringify({
        name:`${userName}`,
        email:`${email}`,
        password:`${password}`,
        avatar:'https://picsum.photos/800'
        
    }),
    headers: {
        'Content-Type': 'application/json'
    },})
    .then(response=>response.json())
    .then(data=>(localStorage.setItem('id', data.id)));
},[isSubmit]);

const navigate = useNavigate();
   
useEffect(()=>{
    if(localStorage.getItem('id')){
        navigate('/user')
        
    }
},[])

     
    return (
        <div className='container'>
        <div className='row border-black'>
            <div className='col-md-6 offset-md-3 col-xs-12 p-md-3 rouded-4 shadow'>
                <h1 className='text-xs-center'>
                    Registration
                </h1>
                <fieldset>
                    <form onSubmit={handleSubmit}>
                        <fieldset className='form-group'>
                                <input type='text'
                                className='form-control form-control-lg mb-3'
                                placeholder='Name'
                                value={userName}
                                onChange={saveUserName}/>
                        </fieldset>
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
                type='submit'>
            Sign up</button>
                </form>
                </fieldset>
               
            </div>
        </div>
        
    </div>
    );
}

export default Register;