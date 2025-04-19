import React from "react";
import "../Hojas-de-estilo/details.css";

/*definimos la funcion que nos retornará los detalles del perro */
function Details({ isOpen, onClose, cardDetails }) {
  if (!isOpen) return null;
  /*Aplicamos la estructura y diseño */
  return (
    <div className="card modal-details ">
      <div className="modal-content  modal-sm">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className="title-name">{cardDetails.nombre}</h2>
        <div className="text-center">
          <img
            src={cardDetails.imageUrl}
            alt="perro"
            style={{ maxWidth: "75%", borderRadius: "8px" }}
          />
        </div>
        <div className="descripcion text-dark fs-5">
          <p className="mt-2"> {cardDetails.descripcion}</p>
          <p className="mt-2"> Ubicado en: {cardDetails.ubicacion}</p>
          <p className="mt-2"> contacto: +502 {cardDetails.contacto}</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
