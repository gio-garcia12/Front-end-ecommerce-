import "./Contacto.css"


export default function Contacto(){


    return(
        <>
    

        <section className="contacto">
      <div className="contact-container">
        <h2>Contacto</h2>
        <form className="contact-form" >
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Asunto:</label>
            <input
              type="text"
              id="subject"
              name="subject"

              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"

              required
            ></textarea>
          </div>
          <button className="btnct" type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
        

        </>
    )
}