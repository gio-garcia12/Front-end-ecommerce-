import { NavLink } from "react-router-dom"
import "./Header.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { useOrder } from "../../context/OrderContext"
import Modal from "../modal/Modal"
import { useState } from "react"
import { useUser } from "../../context/UserContext"

export default function Header(){

    const[isOpen,setIsOpen] = useState(false)

    function handleClose(){
        setIsOpen(false)

    }
    function handleShow(){
        setIsOpen(true)
    }


    //const isAdmin = true//
    const {user,logout} = useUser()
    const {toggleSidebarOrder,count}= useOrder()
    
    return(
      <>
       <header>
        <nav className="header-nav">
            <NavLink to="/" className="nav-link">Home</NavLink>
            {/*<NavLink to="/login" className="nav-link">login</NavLink>*/}
            {
            user ? <button className="nav-link" onClick={logout}> Logout </button> 
                  : <NavLink to="/login" className="nav-link" onClick={(handleShow)}> login</NavLink>  }
           
            <NavLink to="/registro" className="nav-link">Registro</NavLink>
            <NavLink to="/contacto" className="nav-link">Contacto</NavLink>
            <NavLink to="/acerca-de" className="nav-link">Acerca de</NavLink>

           
           
            {user?.role == "ADMIN_ROLE" &&(
                <>
                <NavLink to="/admin-product" className="nav-link">Admin Product</NavLink>
                <NavLink to="/admin-user" className="nav-link">Admin User</NavLink>
                </>
            )
           }


        </nav>

           <div className="user-info">
            <div className="user-cart-container" data-count={count}>
            <FontAwesomeIcon className="user-cart" icon={faCartShopping} onClick={()=> toggleSidebarOrder()}/>
            </div>
           </div>
       </header>

       <Modal title="Login" isOpen={isOpen} handleClose={handleClose} >

           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, possimus?</p>

       </Modal>
      </>
    )
}