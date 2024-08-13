import { useForm } from "react-hook-form"
//import axios from "axios"
import { useEffect, useState } from "react"
import "./AdminProduct.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { formatTimestampToInputDate } from "../../services/utils/formatDate"
import"../../layout/modal/Modal.css"
import { useUser } from "../../context/UserContext"
//import api from "../../services/interceptor/interceptor"
import useApi from "../../services/interceptor/interceptor"


// const URL =`https://664e516afafad45dfadfc59b.mockapi.io`
//const URL = import.meta.env.VITE_SERVER_URL


export default function AdminProduct(){
    const api= useApi()
   // const[isOpen,setIsOpen] = useState(false)
    const[products, setProducts] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const {token} = useUser()
    const [categories,setCategories] = useState([])
 
    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState:{errors}
    } = useForm()


    useEffect(()=>{
        getProducts()
        getCategories()
    },[])



    async function getCategories(){
        try{

            const response = await api.get(`/categories`)
           const categoriesDB = response.data.categories
           setCategories(categoriesDB)

        }catch(error){
            console.log("error al obtener categorias ",error)
        }
    }



   // function handleClose(){
   // setIsOpen(false)
    //reset()
   // }

   // function handleOpen(){
   //   setIsOpen(true)  
   // }


    async function getProducts(){
            try{
                
                const response = await api.get(`/products`)

                const {products} = response.data
                setProducts(products)
                console.log(response)
            }catch(error){
                console.log(error)
            }
    }
    

    function onSubmit(data){

        const formData = new FormData()

        formData.append("id",data.id)
        formData.append("name",data.name)
        formData.append("price",+data.price)
        formData.append("image",data.image.length ? data.image[0]: undefined)
        formData.append("createdAt",new Date(data.createdAt).getTime())
        formData.append("category",data.category)
        formData.append("description",data.description)
     
        //data.image = data.image[0]
       //data.createdAt = new Date(data.createdAt).getTime()
        //data.price= +data.price

        if(data.id){
            updateProductData(formData)
        }else{
            createProduct(formData)
        }

    
    } 
    
    async function createProduct(product){
        try{
               
             
                const newProduct= await api.post(`/products`,
                    product,)

                
                getProducts()
                console.log(newProduct)
                reset()
        }catch(error){
            console.log(error)
        }
    }


    async function updateProductData(productFormData){

        try{
            const id = productFormData.get("id")

            await api.put(`/products/${id}`, productFormData)

            /*await axios.put(`${URL}/products/${id}`, productFormData,{
                headers:{
                    Authorization: token
                }
            })*/
           
            getProducts()
            //Swal.fire()
            setIsEditing(false)
            reset()
        }catch(error){
            console.log(error)

        }
    }


    async function deleteProduct(id){
        try{
            
            await api.delete(`products/${id}`,{
                headers:{
                    Authorization: token
                }
            })
         
            getProducts()
            //Swal.fire()
        }catch(error){
            console.log(error)
            //colocar un mensaje para el usuario de que fallo el borrado
        }
    }



function handleEditProduct(producto){
    console.log("Editar Producto", producto)
   
    setIsEditing(true)
    setValue("id",producto._id)
    setValue("name",producto.name)
    setValue("price",producto.price)
    //setValue("image",producto.image)
    setValue("category",producto.category._id)
    setValue("description",producto.description)
    setValue("createdAt", formatTimestampToInputDate(producto.creadedAt))
   // setIsOpen(true)
}

    return(
        <div className="admin-container">
        <h1>Admin product</h1>

        <div className="admin-form-container">
                    <form className="admin-form" onSubmit={handleSubmit(onSubmit)} >
                   <input type="hidden"{...register("id")} />
                   <div className="input-group">
                        <label htmlFor="Producto">Producto</label>
                        <input placeholder="Producto" type="text" {...register ("name",{required:true,minLength:5,maxLength:50})}  />
                        {errors.name?.type === "required" && (
                        <span className="input-error">El campo es requerido</span>
                            )}

                            {(errors.name?.type === "minLength" ||
                            errors.name?.type === "maxLength") && (
                            <span className="input-error">
                                La cantidad de caracteres es invalida
                            </span>
                            )}
                   </div>

                    <div className="input-group">
                    <label htmlFor="Precio">Precio</label>
                    <input  type="number" {...register("price")} />
                    </div>

                    <div className="input-group">
                    <label htmlFor="URLimage">URL imagen</label>       
                    <input type="file" accept="image/*" {...register ("image")}  />
                    </div>

                    <div className="input-group">
                    <label htmlFor="categoria">Categoria</label>
                    <select {...register ("category")}className="select-input"> 
                        {categories.map(category=>
                            <option value={category._id} key={category._id}>{category.viewValue}</option>
                        )}
                    </select>
                     </div>

                     <div className="input-group">
                    <label htmlFor="descripcion">Descripcion</label>
                    <textarea type="text" {...register ("description")}> </textarea>
                    </div>
                    <div className="input-group">
                    <label htmlFor="Fecha">Fecha</label>
                    <input type="date" {...register ("createdAt")}  />
                    </div>
                    <button  className= {isEditing? 'btn-succes': '' } type="submit"> {isEditing? 'Actualizar': 'Crear'}</button>

            </form>

        </div>

        <div className="admin-table-container">
            <table className="admin-table">
                <thead>
                    <tr className="admin-table-head" >
                        <th className="table-image" >Imagen</th>
                        <th className="table-name">Producto</th>
                        <th className="table-description">Descripcion</th>
                        <th className="table-price">Precio</th>
                        <th className="table-actions">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product)=>(
                        <tr className="admin-table-head"key={product._id} >
                            <td className="table-image" >
                                <img src={`http://localhost:3000/images/products/${product.image}`} alt="" />
                            </td>
                            <td className="table-name">
                                <p>{product.name}</p>
                            </td>
                            <td className="table-description">
                                <p>{product.description}</p>
                            </td>
                            <td className="table-price">
                                <p>${product.price}</p>
                            </td>
                            <td className="table-actions">
                               <button className="action-btn" onClick={()=> handleEditProduct(product)}>
                                    <FontAwesomeIcon icon={faEdit}/>
                               </button>
                               <button className="action-btn-trash"  onClick={() => deleteProduct(product._id)} >
                                    <FontAwesomeIcon icon={faTrash}/>
                               </button>
                            </td>
                        </tr>   
                    ))}
    
                </tbody>
            </table>
        </div>

        </div>
    )
}