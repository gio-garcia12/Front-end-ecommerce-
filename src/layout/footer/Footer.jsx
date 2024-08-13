import "./Footer.css"



export default function Footer(){
    return(
//<footer>Footer</footer>
<>

<footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Games and Tecnology</h3>
          <p>© 2024 Todos los derechos reservados.</p>
        </div>
        <div className="footer-section footer-logo">
          <img src="https://seeklogo.com/images/P/ps5-gamepad-on-hand-logo-FF1463D003-seeklogo.com.png" alt="Logo" />
        </div>
        <div className="footer-section">
          <h3>Redes Sociales</h3>
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook"></i></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i> </a>
          </div>
        </div>
      </div>
    </footer>
</>


    )
}