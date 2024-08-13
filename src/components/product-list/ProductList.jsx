import "./ProductList.css"
import { useEffect, useState } from "react";
import ProductCard from "../product-card/ProductCard";
import axios from "axios"
import Swal from "sweetalert2";
//const URL  = "https://664e516afafad45dfadfc59b.mockapi.io"
const URL = import.meta.env.VITE_SERVER_URL

export default function ProductList (){

    const [products, setProducts] = useState([])
   // const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        getProducts({})
    },[])

    useEffect(()=>{
        getCategories()
    },[])

async function getCategories(){
try{
    const response = await axios.get(`${URL}/categories`)
    const {categories: categoriesDB} = response.data
    console.log(categoriesDB)
    setCategories(categoriesDB)

}catch(error){
    console.log(error)
    Swal.fire("Error", "No se pudieron obtener categorias")
}
}





async function getProducts({category}){
    try{
        console.log(category)

        const categoryQuery = category? `&category=${category}`: ''
            const response = await axios.get(`${URL}/products${categoryQuery}`)
            const productsdb = response.data.products
            console.log(productsdb)
            setProducts(productsdb)
          
    }catch (error){
        console.log(error)
    } 
}

    return(

        <div>
           <h1>Lista de productos </h1>
           <div className="product-filters">
            <select onChange ={(e)=> getProducts({category: e.target.value})}>
                {
                    categories?.map(cat =>{
                        return(
                        <option key ={cat._id} value={cat._id}> {cat._viewValue} </option>
                    )})
                }
            </select>
           </div>
           <div className="card-container">
            {
              products?.map((prod)=>{
            
                return(
                    <ProductCard key={prod._id} product={prod}/>
                )
                })
            }
           </div>
           

        </div>
    )
}