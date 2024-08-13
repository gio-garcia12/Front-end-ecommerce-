
//import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import"./ProductDetail.css"
import useApi from "../../services/interceptor/interceptor"

//const URL  = "https://664e516afafad45dfadfc59b.mockapi.io"
//const URL = import.meta.env.VITE_SERVER_URL


export default function ProductDetail(){
const api= useApi()    
const [product, setProduct] = useState()
const [loading, setLoading] = useState(true)
const {id} = useParams();



async function getProductById(id){
    try {
        
        const response = await api.get(`/products/${id}`)
        console.log (response.data)
        setProduct(response.data)
        setLoading(false)
    } catch (error) {
        console.log(error)
    }
}


useEffect(()=>{
    getProductById(id)
    console.log(id)

},[id])

if (loading) {
    return <h3>Cargando....</h3>
        
}    


return (

<div className="detail">
<h1>Detalle del producto </h1>

{product.map((product)=>(
<div className="product-card" key={product._id}>

      <img src={`http://localhost:3000/images/products/${product.image}`} alt={product.name} className="product-image" />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-price">${product.price}</div>
      </div>
    </div>
))}
</div>

)
}
