import React, { useState, useEffect} from 'react';
import Register from './Register';
import { useNavigate,useLocation,Link } from 'react-router-dom';

function Authentiation() {


  const[email, setEmail]= useState('');
  const[password, setPassword] =useState('');
  const[isSubmit, setIsSubmit]=useState(false);
  const [isAuthenticated, setAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location=useLocation();
  const from = location.state?.from || '/user';

  const handleSubmit=(event)=>{
      event.preventDefault();
      setError(null);
      setIsLoading(true)
      setIsSubmit(true)
  }
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
      body: JSON.stringify({email:email,
          password:password}),
      headers: {
          'Content-Type': 'application/json'
      },})
      .then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка авторизации');
          }
          return response.json();
        })
      .then((data) => {
          localStorage.setItem('your_access_token', data.access_token);
          localStorage.setItem('login_time', Date.now());
          setAuth(true);
          navigate(from, { replace: true }); 
        })
      .catch((err) => {
          setError(err.message); 
          // navigate('/register');
        })
      .finally(() => {
          setIsSubmit(false); 
          setIsLoading(false);
        });
  },[isSubmit]);

  useEffect(() => {
      if (isLoading) return;
      if (isAuthenticated) {
        navigate('/user'); 
      } else {
        navigate('/register');
      }
    }, [isAuthenticated]);

    return (
        <>
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
                    type='submit'
                    disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
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