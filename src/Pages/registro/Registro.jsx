import "./Registro.css"

export default function Registro(){
    return (
        <div className="register-container">
            <div className="wave"></div>
            <div className="wave"></div>
            <div className="wave"></div>
            <form className="register-form" >
                <h1>Registro</h1>
                
                <label></label>
                <input
                    name="name"
                    required
                    type="text"
                    placeholder="Nombre completo"
                   
                />
                <div className="formct">
                        <label></label>
                        <input
                            name="email"
                            required
                            type="text"
                        placeholder="Correo electronico"
                        />

        <               label></label>
                        <input
                            name="phone"
                            required
                            type="number"
                        placeholder="Telefono"
                        />
                </div>


                <label></label>
                <input
                    name="localidad"
                    required
                    type="text"
                    placeholder="Localidad"
                />

                <label></label>
                <input
                    name="username"
                    required
                    type="text"
                    placeholder="Nombre de ususario"
                   
                />

                <div className="formct">
                        <label></label>
                        <input
                            name="password"
                            required
                            type="password"
                            placeholder="Password"
                        
                        />

                        <label></label>
                        <input
                            name="password"
                            required
                            type="text" 
                            placeholder="Confirmar password"
                        />

                </div>

                <div className="button">                
                <button type="submit" className="button">
                    Registrar
                </button>
                </div>

            </form>
        </div>
    );
}