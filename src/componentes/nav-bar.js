import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Hojas-de-estilo/NavBar.css";

/*definimos el componente de la navbar con ayuda de bootstrap*/
function NavBar({ openModal, goToLogin }) {
  return (
    <div className="nav-container">
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Adogtame
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Inicio
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" onClick={openModal}>
                  Poner en adopción
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    goToLogin();
                  }}
                >
                  Iniciar sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
