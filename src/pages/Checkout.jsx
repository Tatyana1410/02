import React, {useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

function Checkout() {
    const {selectedProduct,clearCheckCart} = useContext(ProductContext);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!userName.trim() || !userAdress.trim() || !userPhone.trim()) {
        alert('All fields are required!');
        return;
        }
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(userPhone)) {
        alert('Please enter a valid phone number (digits only, 10 to 15 characters).');
        return;
        }
        navigate('/check')
      };
    const[userName, setUserName]=useState('');
    const[userAdress, setUserAdress]= useState('');
    const[userPhone, setUserPhone] =useState('');
    function saveUserName(e){
        setUserName(e.target.value)
    }
    function saveUserAdress(e){
        setUserAdress(e.target.value)
    }
    function saveUserPhone(e){
        setUserPhone(e.target.value)
    }
    const totalPrice = selectedProduct.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );


    return (
        <div className='col-md-6 offset-md-1 col-xs-12 p-md-3 rouded-4 shadow'>
            <h2>Place an order</h2>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <fieldset className='form-group'>
                        <input type='text'
                            className='form-control form-control-lg mb-3'
                            placeholder='Name'
                            value={userName}
                            onChange={saveUserName}
                            required/>
                    </fieldset>
                    <fieldset className='form-group'>
                        <input type='text'
                            className='form-control form-control-lg mb-3'
                            placeholder='Adress'
                            value={userAdress}
                            onChange={saveUserAdress}
                            required/>
                    </fieldset>
                    <fieldset className='form-group'>
                        <input type='tel'
                            className='form-control form-control-lg mb-3'
                            placeholder='Phone'
                            value={userPhone}
                            onChange={saveUserPhone}
                            required/>
                    </fieldset>

                    <h2>Order:</h2>
                        <ul>
                        {selectedProduct.map((item,index) => (
                            <li key={index} className='list-group-item'>
                                <div className='d-flex justify-content-between'>
                                    <h5>{item.title} </h5> 
                                    <h4> {item.price} $</h4>
                                </div>
                                
                            </li>
                        ))}
                        </ul>
                        <div className='container p-3 text-end'>
                            <h4>Total Price: {totalPrice} $</h4>
                        </div>
                        <div>
                        <button type="submit" className='btn btn-secondary' onClick={clearCheckCart}>Confirm the order</button>
                        </div>
                </form>
            </fieldset>
        </div>
    );
}

export default Checkout;