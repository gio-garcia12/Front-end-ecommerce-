import ProductList from "../../components/product-list/ProductList";
import { useOrder } from "../../context/OrderContext";
import "./Home.css"

export default function Home(){
const {order} = useOrder()
    console.log(order)
    return(
        <>
   
        <section className="main-banner">
      <img className="banner1" src="https://i.redd.it/aqbwvaf6dht51.jpg" >
       
      </img>
     <h2 className="banner-text">Games & Tecnology</h2>
    </section>

        <ProductList/>
           

        </>
    )
}