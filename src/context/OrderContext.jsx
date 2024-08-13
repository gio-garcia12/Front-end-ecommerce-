import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUser } from "./UserContext";
import useApi from "../services/interceptor/interceptor";


const OrderContext = createContext()

const ORDER={
 user:null,
 products: [],
 total:0,

}

export const useOrder = () => useContext(OrderContext)

export const OrderProvider = ({children}) => {
    const {user,token} = useUser()
    const api = useApi()
    //estado de la orden 
const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("order")) || ORDER
)




const[count,setCount]= useState(0)

const [sidebarToggle,setSidebarToggle] = useState(false)

useEffect(()=>{
    //calculateTotal()
    calculateCount()
},[order])

const [total,setTotal] = useState(0)

    //estado de desplegar o no el sidebar 
    //estados total
    //function agregar producto

    function addOrderItem(producto){
        // Buscar en la orden si existe el producto y añadimos 1 a cantidad 
        // si no existe lo añadimos al array 
        const product = order.products.find((prod) => prod.product == producto._id)

        if(product){
            handleChangeQuantity(product.product,product.quantity +1)
        } else {
            
            const newOrderProduct = {
                product: producto._id,
                quantity:1,
                price: producto.price,
                image: producto.image,
                name: producto.name
            }
            const products = [...order.products,newOrderProduct]


           const total = calculateTotal(products)

        
            setOrder({...order,
                      products,
                      total
                    })


            //localStorage.setItem("order", JSON.stringify([...order,producto]))
            
        }
    }



    //calcular total 
        function calculateTotal(array_contar){
            let totalCount = 0
            array_contar.forEach(prod =>{
                totalCount += prod.price * prod.quantity
            })
            return totalCount
         
        }


        function calculateCount(){
            let count = 0 
            order.products.forEach((prod)=> {count += prod.quantity

            })
                setCount(count)
            }

    //remover elemento de la carta 
    //toggleSidebar

    
    //funcion para manejar los cambios de cantidad
    function handleChangeQuantity(id,quantity){
        //Buscar el producto por su id 
        //Cambiar la cantidad 
        //Actualizar mi estado Order 
        const updProducts = order.products.map((item) => {
            if (item.product == id){
                item.quantity = +quantity 
            }
            return item 
        })
        //localStorage.setItem("order", JSON.stringify(newOrder))
        const total = calculateTotal(updProducts)
        setOrder({...order, products: updProducts, total})

    }

    //funcion quitar elementos d emi orden 

    function removeItems(id){

            Swal.fire({
                title:"Eliminar elemento",
                rext:"Desea quitar este producto",
                icon:"error",
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonText:"Borrar"
            }).then(result =>{
                if(result.isConfirmed){
                    const products = order.products.filter(prod=> prod.product != id)
                    //localStorage.setItem("order", JSON.stringify(upOrder))
                    const total = calculateTotal(products)
                    setOrder({...order,products,total})
                }
            })    
            
    }


    async function postOrder(){
        try{

            //checkear si el usuario esta logeado 
            if (!user || !token){
                Swal.fire({
                    titel: "error",
                    text:"debe estar logeado",
                    icon: "warning",
                    timer: 4000
                })
                return
            }

            const products = order.products.map(item => {
                return{
                    quantity: item.quantity,
                    product: item.products,
                    price: item.price
                }
            })
            //armar el objeto order para el backend
            const nuevaOrden = {
                total: order.total,
                user: user._id,
                products
                
            }
            const response = await api.post("/orders", nuevaOrden)
           console.log(response)
            if(!response) throw new Error ("error al crear orden ")
            //  enviarlo
            Swal.fire("Orden Creada", "la orden se creo correctamente", "success")

            setOrder(ORDER)


            const orders = await api.get(`/orders/${user._id}`)
            console.log (orders.data)

        }catch (error){
            console.log(error)
            Swal.fire("error", "error al crear la orden", "error")
}
    }


    function toggleSidebarOrder(){
     setSidebarToggle(!sidebarToggle)

    }

        return(
            <OrderContext.Provider value={{order,sidebarToggle,count, total,addOrderItem,handleChangeQuantity, removeItems,toggleSidebarOrder,postOrder}}> 
                {children}
            </OrderContext.Provider>
        )



 }

