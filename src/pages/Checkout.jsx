import React, {useState, useEffect} from 'react';

function Checkout({selectedProduct}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Заказ оформлен!');
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
    const totalPrice = selectedProduct.reduce((acc, product) => {
        const price = product.price || 0;
        return acc + price;
      }, 0);
    
      // Отправка заказа
    //   fetch('https://api.example.com/orders', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(orderData),
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       alert('Заказ успешно оформлен!');
    //     })
    //     .catch(error => {
    //       alert('Ошибка при оформлении заказа!');
    //       console.error(error);
    //     });
    
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
                        <button type="submit" className='btn btn-secondary'>Confirm the order</button>
                        </div>
                </form>
            </fieldset>
        </div>
    );
}

export default Checkout;