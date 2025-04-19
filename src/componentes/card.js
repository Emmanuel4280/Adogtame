import React from "react";
import "../Hojas-de-estilo/card.css";

/* Carta de presentación de los perritus */

function Card({ nombre, imagen, descripcion, onClick }) {
  return (
    /* Escuchamos eventos de click por medio de la propiedad */
    <div className="container" onClick={onClick}>
      <div className="row justify-content-center">
        <div className="">
          <div className="card">
            <img className="imagen rounded" src={imagen} alt="Foto del perro" />

            <div className="Card-body"></div>
            <p className="nombre-perro fs-1 fw-bold text-dark">{nombre}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
