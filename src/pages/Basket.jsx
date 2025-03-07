import React from 'react';



function Basket({selectedProduct}) {
    
    // const totalPrice = selectedProduct.reduce((acc, product) => {
    //     const price = product.price || 0;
    //     return acc + price;
    //   }, 0);
   console.log(selectedProduct)


    return (
        <>
        <div className='container'>
            <h2>Basket</h2>
        
        {selectedProduct?
            <div className="card" style={{width: 18+'rem'}}>
                <ul className="list-group list-group-flush">
                    {selectedProduct.map(({title,price}, index)=>{
                        return <li className="list-group-item d-flex justify-content-between" key={index}> 
                                {title}  {price} $
                            <button className="btn btn-danger" onClick={()=>remove(index)}>Delete</button>
                        </li>
                    })}
                </ul>
                <div>
                    {/* Загальна сума: {totalPrice} */}
                </div>
            </div>:
            <div className='container my-5'>
                <p className='text-center align-middle'>Basket is empty</p>
            </div>
            }

</div>
            
        </>
    );
}

export default Basket;