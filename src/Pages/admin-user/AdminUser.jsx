import { useForm } from "react-hook-form"
import axios from "axios"
import { useEffect, useState } from "react"
import "./AdminUser.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { formatTimestampToInputDate } from "../../services/utils/formatDate"
import"../../layout/modal/Modal.css"
import Swal from "sweetalert2"
import useApi from "../../services/interceptor/interceptor"

//const URL =`https://664e516afafad45dfadfc59b.mockapi.io`
//const URL = import.meta.env.VITE_SERVER_URL


export default function AdminUser(){
   // const[isOpen,setIsOpen]= useState(false)
   const api= useApi()
   const[users, setUsers] = useState([])
   useEffect(()=>{
       getUsers()
   },[])

   const {register,setValue,reset,handleSubmit,formState:{errors}}=useForm()

   const [isEditing, setIsEditing] = useState(false)


   /*function handleClose(){
   setIsOpen(false)
   }

   function handleOpen(){
     setIsOpen(true)  
   }*/


   async function getUsers(){
           try{
               
            const response = await api.get(`/users?limit=100`)

               const users = response.data?.users || []
               setUsers(users)
               console.log(response)
           }catch(error){
               console.log(error)
               setUsers([])
           }     
   }
   

   function onSubmit(data){
       data.createdAt = new Date(data.createdAt).getTime()
       data.price= +data.price

       if(data.id != ""){
           updateUserData(data)
       }else{
           createUser(data)
       }

   
   } 
   
   async function createUser(user){
       try{
        const newUser= await api.post(`/users`,
            user,)
               getUsers()
               console.log(newUser)
               reset()
               Swal.fire({
                title:"Usuario Creado",
                icon:"success",
                text:"El usuario fue creado correctamente "

            })
       }catch(error){
           console.log(error)
       }
   }


   async function updateUserData(user){

       try{
           
           await api.put(`/users/${user.id}`, user)
           getUsers()
           //Swal.fire()
           setIsEditing(false)
           reset()
           Swal.fire({
            title:"Usuario Modificado",
            icon:"success",
            text:"El usuario fue modificado correctamente "

        })
       }catch(error){
           console.log(error)

       }
   }


   async function deleteUser(id){

       try{
           
           await api.delete(`/users/${id}`)
           getUsers()
           
           //Swal.fire()
       }catch(error){
           console.log(error)
           //colocar un mensaje para el usuario de que fallo el borrado
       }
    
   }



function handleEditUser(usuario){
   console.log("Editar Usuario", usuario)
  
   setIsEditing(true)
   setValue("id",usuario._id)
   setValue("fullname",usuario.fullname)
   setValue("location",usuario.location)
   setValue("image",usuario.image)
   setValue("password",usuario.password)
   setValue("email",usuario.email)
   setValue("borndate", formatTimestampToInputDate(usuario.borndate))
   
}

   return(
       <div className="admin-container">
       <h1>Admin product</h1>
      
       <div className="admin-form-container">
                   <form className="admin-form" onSubmit={handleSubmit(onSubmit)} >
                  <input type="hidden"{...register("id")} />
                  <div className="input-group">
                       <label htmlFor="Nombre"></label>
                       <input placeholder="Nombre" type="text" {...register ("fullname",{required:true,minLength:5,maxLength:50})}  />
                       {errors.fullname?.type === "required" && (
                       <span className="input-error">El campo es requerido</span>
                           )}

                           {(errors.fullnamename?.type === "minLength" ||
                           errors.fullnamename?.type === "maxLength") && (
                           <span className="input-error">
                               La cantidad de caracteres es invalida
                           </span>
                           )}
                  </div>

                   <div className="input-group">
                   <label htmlFor="Localidad"></label>
                   <input placeholder="Localidad" type="text" {...register("location")} />
                   </div>

                   <div className="input-group">
                   <label htmlFor="URLimage"></label>       
                   <input placeholder="URL imagen" type="url" {...register ("image")}  />
                   </div>
                   <div className="input-group">
                   <label htmlFor="Password"></label>
                   <input placeholder="Pssword" type="password" {...register ("password")}/>
                    </div>

                    <div className="input-group">
                   <label htmlFor="correo"></label>
                   <input placeholder="Correo" type="text" {...register ("email")}/>
                   </div>
                   <div className="input-group">
                   <label htmlFor="Fecha de nacimiento"></label>
                   <input type="date" {...register ("borndate")}  />
                   </div>
                   <button  className= {isEditing? 'btn-succes': '' } type="submit"> {isEditing? 'Actualizar': 'Crear'}</button>

           </form>

       </div>

       <div className="admin-table-container">
           <table className="admin-table">
               <thead>
                   <tr className="admin-table-head" >
                       <th className="table-image" >Imagen</th>
                       <th className="table-name">Nombre</th>
                       <th className="table-description">Correo</th>
                       <th className="table-price">Localidad</th>
                       <th className="table-actions">Acciones</th>
                   </tr>
               </thead>
               <tbody>
                 {Array.isArray(users)&&  users.map((user)=>(
                       <tr className="admin-table-head"key={user._id} >
                           <td className="table-image" >
                               <img src={user.image} alt="" />
                           </td>
                           <td className="table-name">
                               <p>{user.fullname}</p>
                           </td>
                           <td className="table-description">
                               <p>{user.email}</p>
                           </td>
                           <td className="table-price">
                               <p>{user.location}</p>
                           </td>
                           <td className="table-actions">
                              <button className="action-btn" onClick={()=> handleEditUser(user)}>
                                   <FontAwesomeIcon icon={faEdit}/>
                              </button>
                              <button className="action-btn-trash"  onClick={() => deleteUser(user._id)} >
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