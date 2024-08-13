import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { removeDecimals } from "../../services/utils/formatNumber"
import "./ProductCard.css"
import { faHeart } from "@fortawesome/free-regular-svg-icons"
import { useOrder } from "../../context/OrderContext"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { useEffect } from "react"


export default function ProductCard ({product}){
    
    const URL = import.meta.env.VITE_IMAGE_URL

    const {addOrderItem}= useOrder()

    useEffect(() => {
        ({})
    },[])
    
   return(

        <div className="card-wrapper"> 
        <div className="card" >
           
            <div className="card-header">

                <img    className="card-img cimg1" 
                        src= {`http://localhost:3000/images/products/${product.image}`}
                        alt={product.name} 
                        
                      /> 

              

                 <div className="actions">
                    
                    <FontAwesomeIcon icon={faHeart}/>
                   <i className="fa-regular fa-eye"></i> 
                </div> 
            </div>

            <div className="card-main">
                <div className="card-category">{product.category.name}</div>
                <h3 className="card-title">{product.name}</h3>
                <div className="card-average">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    (5)
                    <span>Fecha ingreso:{product.createdAt}</span>
                </div>
                <div className="card-price">
                    <span className="price"> 
                        <small>$</small> {removeDecimals (product.price * 0.9)}</span>
                    <span className="normal-price">
                        <small>$</small> {removeDecimals (product.price)}</span>
                </div>
            </div>

            <div className="card-footer">


                <Link className = "add-to-cart" to ={`/product-detail/${product.id}`}> Ver
                   <FontAwesomeIcon icon={faArrowUpRightFromSquare} title="Ver Detall" /> 
                </Link>
               
                <button onClick={ () => addOrderItem(product)} className="add-to-cart">
                    Añadir <i className="fa-solid fa-chevron-right"></i> 
                </button>
            </div>
        </div>

        </div>
   
    )


}