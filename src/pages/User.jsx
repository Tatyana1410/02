import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function User({favoriteProducts,removeFavorite, selectProd, clearFavorite}) {

    const [userName, setUserName]=useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword] =useState('');
    const [isSubmit, setIsSubmit]=useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isProfileLoading, setIsProfileLoading] = useState(true);
    const [id, setId]=useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmit(true);
        setIsLoading(true);
    }
    console.log(id)


    useEffect(() => {
        fetch(`https://api.escuelajs.co/api/v1/auth/profile/`,{
            method:'GET',
            headers:{'Authorization': `Bearer ${localStorage.getItem('your_access_token')}`}})
            .then(resp => {
                if (!resp.ok) {
                  throw new Error('Ошибка загрузки профиля');
                }
                return resp.json();
              })
              .then(data => {
                setUserName(data.name);
                setEmail(data.email);
                setId(data.id);
              })
              .catch(err => {
                console.error('Error fetching profile:', err);
                alert('Не удалось загрузить профиль');
              })
              .finally(() => {
                setIsProfileLoading(false);
            });
        }, []);

    useEffect(() => {
        if(!isSubmit){return}
        fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
        method: 'PUT', // Используем метод PUT для обновления данных
        headers: {
          'Content-Type': 'application/json',
        //   'Authorization': `Bearer ${localStorage.getItem('your_access_token')}`
        },
        body: JSON.stringify({
          name: userName,
          email: email,
          password: password,
        })
      })
        .then(async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка при обновлении данных');
          }
          return response.json();
        })
        .then((data) => {
          alert('Данные успешно обновлены!');
          console.log('Updated user:', data);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
          alert(error.message);
        })
        .finally(() => {
          setIsSubmit(false);
        });
},[isSubmit]);
        
    
    function saveUserName(e){
        setUserName(e.target.value)
        }
    function saveEmail(e){
        setEmail(e.target.value)
        }
    function savePassword(e){
        setPassword(e.target.value)
        }
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
    };
 if (isProfileLoading) {
            return <div>Загрузка профиля...</div>;
          }   

    return (
        <div className='container'>
                <div className='col-lg-6 col-12 mb-5'>
                    <fieldset>
                        <form onSubmit={handleSubmit}>
                            <fieldset className='form-group'>
                                <input type='text'
                                    className='form-control mb-3'
                                    placeholder='Name'
                                    value={userName}
                                    onChange={saveUserName}/>
                            </fieldset>
                            <fieldset className='form-group'>
                                <input type='email'
                                    className='form-control mb-3'
                                    placeholder='Email'
                                    value={email}
                                    onChange={saveEmail}/>
                            </fieldset>
                            <fieldset className='form-group'>
                                <input type="password" 
                                    className="form-control mb-3"
                                    placeholder='Password'
                                    value={password}
                                    onChange={savePassword}/>
                            </fieldset>
                            <div className='d-flex justify-content-between'>
                                <button className='btn btn-secondary col-md-5 pull-xs-right'
                                type='submit'
                                >
                                  Update</button>
                                <button className='btn btn-danger col-md-5' onClick={() => localStorage.removeItem('your_access_token')}>Exit</button>
                            </div>
                            
                        </form>
                    </fieldset>
                </div>

                {favoriteProducts.length ?
                    <div className="col-12">
                        <h2>Favorite</h2>
                        {favoriteProducts.map((product, index)=>{
                            return <div key={index} className='product-favorite d-flex col-12 border-bottom border-top py-2 border-2 align-items-center justify-content-between'>
                                        <div className='col-lg-4 col-5'>
                                            <img src={product.category.image} 
                                            alt={product.title} 
                                            style={{width:'50%',
                                            cursor:'pointer'
                                            }}
                                            onClick={() => handleProductClick(product.id)}/>
                                        </div>
                                        <div className='col-5'>
                                            <h5 className='mb-3'
                                            style={{cursor:'pointer'}}
                                            onClick={() => handleProductClick(product.id)}>
                                              {product.title}</h5>
                                            <h4 className='price'>{product.price} $</h4>
                                        </div>
                                        <div className='col-3 text-end'>
                                            <button className="btn" onClick={()=>removeFavorite(index)}><FontAwesomeIcon icon={faTrashCan} className='icon'/></button>
                                            <button className="btn mx-2" onClick={()=>selectProd(product)}><FontAwesomeIcon icon={faBasketShopping} className='icon'/></button>
                                        </div>
                                    </div>
                        })}
                        <button className='btn btn-secondary mt-3 px-lg-5 fs-6' onClick={clearFavorite}>Clear</button>
                    </div>
                :null}

        </div>
    );
}

export default User;