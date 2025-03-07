import React, {useState, useEffect} from 'react';


function SingleProduct({prod}) {
    // const [image, setImage]=useState();
    // useEffect(()=>{
    //     if (!image.length) return;
    //     setImage(value.images[0]);
    // }, [value.images])
    
    
    return (
        <>
        {prod.map((value, index)=>(
                    <div className="card m-2 p-2" style={{width:'18rem'}}>
                        <div>
                            <img key={`${index}_${value.title}`}
                                src={value.images[0]} 
                                className="card-img-top" 
                                alt={value.title}
                                style={{width:'100%',
                                height:'18rem'}}/>
                                {/* {value.images.map((image, i)=>(
                                    <div
                                    key={i}>
                                        <img src={image} alt=""
                                        onClick={()=>setImage(value.image)} />
                                    </div>
                                ))} */}
                            
                        </div>

                        <div className="card-body">
                            <h5 key= {`${value.title}_${index}`} className="card-title">{value.title}</h5>
                            <h5 key= {value.id} className="card-title">{value.price}</h5>
                            <p>{value.description}</p>
                            <a key={value.id} href={`https://api.escuelajs.co/api/v1/products`} className="btn  btn-outline-secondary">Go</a>
                        </div>
                    </div>
        ))}
        
       </>



    //     goods &&
    //    {goods.map((good, index)=>(
    //         <div className="card m-2 p-2" style={{width:'18rem'}}>
    //             <img key={`${index}_${good.title}`}
    //                 src={good.images[0]} 
    //                 className="card-img-top" 
    //                 alt={good.title}
    //                 style={{width:'100%',
    //                 height:'18rem'}}/>
                    
    //         <div className="card-body">
    //             <h5 key= {`${good.title}_${index}`} className="card-title">{good.title}</h5>
    //             <h5 key= {good.id} className="card-title">{good.price}</h5>
    //                 <p>{good.description}</p>
    //             <a key={id} href={`https://api.escuelajs.co/api/v1/products/${id}`} className="btn btn-outline-secondary">Go</a>
    //         </div>
    //     </div>
    //     ))}
    );
}

export default SingleProduct;