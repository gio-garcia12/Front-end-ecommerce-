import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import "./OrderSidebar.css"
import { faTrash } from "@fortawesome/free-solid-svg-icons";


export default function OrderSidebar(){
const {order,total,handleChangeQuantity,removeItems,sidebarToggle,postOrder} = useOrder()


    return (
		<div className={`order-wrapper ${sidebarToggle ? 'active': ""}`}>
			<div className="list-container">
				<h2>Orden actual:</h2>
					
					<ul className="order-list">
					{order.products?.map(product=>{
								return(
									<li className="order-item" key={product.product}>
										<img className="order-image" src= {product.image ? `${import.meta.env.VITE_IMAGES_URL}/product/${product.image}` :"https://thumbs.dreamstime.com/b/icono-no-disponible-del-producto-118523643.jpg"} alt="" />	
										<div className="order-item-name" title ={product.name}>
										{product.name}
										</div>
										
										
										
										<div className="order-quantity">
											<input 
											className="order-quantity-input" 
											type="number" 
											value={product.quantity} 
											onChange={(evt) => handleChangeQuantity(product.product, evt.target.value)}
											min={1}
											/>
											
										</div>
										<div className="order-price">
											${product.price}
										</div>
										<div className="order-price-subtotal">
											${product.price * product.quantity}
										</div>
										<div className="order-actions">
											<FontAwesomeIcon icon={faTrash} title ="Eliminar producto" onClick={() => removeItems(product.product)} />
										</div>
									</li>
								)

						})

					}
					</ul>
			</div>

			<div className="order-finish">
				<div className="total">
					<div className="total-count">Items:20</div>
					<div className="total-price">
						Total $ <span>{order.total}</span>
					</div>
				</div>
				<div className="order-purchase">
					{/*<a onClick={() => clearCart()}>Limpiar carrito</a>
					<button className="btn" onClick={() => finishOrder()}>
						Comprar
					</button>*/}

					<button className="btn" onClick = {()=> postOrder()}>Finalizar compra </button>
				</div>
			</div>
		</div>
	);
}