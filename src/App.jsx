
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import AdminProduct from './Pages/admin-product/AdminProduct'
import Login from './Pages/login/Login'
import ProductDetail from './Pages/product-detail/ProductDetail'
import AdminGuard from './services/guard/AdminGuard'
import Registro from './Pages/registro/Registro'
import AcercaDe from './Pages/acerca-de/AcercaDe'
import Contacto from './Pages/contacto/Contacto'
import AdminUser from './Pages/admin-user/AdminUser'
import NotFound from './Pages/not-found/NotFound'
import Layout from './layout/Layout'
import OrderSidebar from './layout/order-sidebar/OrderSidebar'

//Estado ordenes []
function App() {
  return <>
  <OrderSidebar/>
        <Routes>
            <Route path="/login" element={<Login/>} />
                  <Route path ="/" element ={<Layout/>}>

                      <Route index element={<Home/>} />
                      <Route path="registro" element={<Registro/>} />
                      <Route path="acerca-de" element={<AcercaDe/>} />
                      <Route path="contacto" element={<Contacto/>} />
                    {/* Rutas protegidas*/}


                      <Route path="admin-product" element={
                        <AdminGuard>
                            <AdminProduct/>
                        </AdminGuard>
                        }/>
                        
                        <Route path="admin-user" element={
                        <AdminGuard>
                            <AdminUser/>
                        </AdminGuard>
                        }/>
                        
                      
                      {/*ruta con param*/}
                      <Route path="product-detail/:id" element={<ProductDetail/>} />

                        <Route path ="*" element ={<NotFound/>} />

            </Route>



        </Routes>
         
            
           

  
  </>
}

export default App
