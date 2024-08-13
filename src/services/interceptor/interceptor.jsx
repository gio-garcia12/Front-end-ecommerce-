import axios from "axios";
import Swal from "sweetalert2";
import { useUser } from "../../context/UserContext";
import { useEffect } from "react";



const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL, 

})

const useApi = () =>{

    const{token, logout}= useUser()

    useEffect(()=>{
      const requestInterceptor = api.interceptors.request.use(config => {
                if(token){
                    config.headers.Authorization = token 
                }
                return config
            }
        )
     const responseInterceptor  = api.interceptors.response.use(
            response => response,
            error => {
                console.log(error)
                //mostrar un mensaje al usuario 
                if(error.response.status == 401){
                    Swal.fire({
                        title:"Error",
                        text: "Sesion vencida o invalida",
                        icon: "error",
                        timer: 1500
                        //deslogearlo si el error en la respuesta fue un estatus 401
                    }).then(()=>{
                        logout()
                    })
                }
            }       
         )
         return ()=>{
            api.interceptors.request.eject(requestInterceptor)
            api.interceptors.response.eject(responseInterceptor)
         }
    },[token])
    return api
}





export default useApi