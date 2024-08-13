import { useForm } from "react-hook-form";
import "./Login.css"
import Swal from "sweetalert2";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const URL = import.meta.env.VITE_SERVER_URL


export default function Login(){
const {login} = useUser()

console.log(URL)
const {register,handleSubmit} = useForm()

function onLogin(data){

login(data)

}

    return (
        <div className="login-container">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <form className="login-form" onSubmit={handleSubmit(onLogin)}>
                <h1>Login</h1>
                <label></label>
                <input
                    {...register("email",{required:true})}
                    type="email"
                   placeholder="Correo electronico"
                />

                <label></label>
                <input
                {...register("password",{required:true})}
                    type="password"
                  placeholder="Contraseña"
                />
                <div className="button">                
                <button type="submit" className="button">
                    Login
                </button>
                </div>

            </form>
        </div>
    );
}