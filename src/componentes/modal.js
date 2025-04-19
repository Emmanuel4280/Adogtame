import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import "../Hojas-de-estilo/modal.css";
import { storage, db } from "../componentes/firebase";
import { collection, addDoc } from "firebase/firestore";

function Modal({ isOpen, onClose, onSubmit, user }) {
  const [imageFile, setImageFile] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [contacto, setContacto] = useState("");

  if (!isOpen) return null;

  const handleUpload = async () => {
    console.log("Descripcion:", descripcion);
    console.log("Nombre:", nombre);
    console.log("Ubicacion:", ubicacion);
    console.log("Contacto:", contacto);

    if (!imageFile || !descripcion || !nombre || !ubicacion || !contacto) {
      setMensaje("Por favor, completá todos los campos.");
      return;
    }

    try {
      // Generar ID único para la imagen
      const imageId = uuidv4();
      const imageRef = ref(storage, `adogtame/${imageId}`);

      // Subir imagen a Firebase Storage
      await uploadBytes(imageRef, imageFile);

      // Obtener la URL pública de la imagen
      const imageUrl = await getDownloadURL(imageRef);

      // Crear nueva tarjeta con la URL de la imagen
      const newCard = {
        nombre,
        descripcion,
        ubicacion,
        contacto,
        imageUrl, // Utilizar la URL de la imagen
        userId: user?.uid || null,
        createdAt: new Date(),
      };

      // Guardar la tarjeta en Firestore
      await addDoc(collection(db, "cards"), newCard);

      // Llamar a onSubmit para agregar la tarjeta al estado
      onSubmit(newCard);

      // Mensaje de éxito
      setMensaje("¡Perro agregado con éxito!");

      // Limpiar los campos
      setImageFile(null);
      setNombre("");
      setDescripcion("");
      setUbicacion("");
      setContacto("");
    } catch (error) {
      // Manejo de errores
      setMensaje("Error al subir: " + error.message);
    }
  };
  return (
    <div className="modal-inicio">
      <div className="card modal-card">
        <div className="card-body text-center">
          <h2 className="card-title">Agregar nuevo perro</h2>
          <p className="card-text">
            Sube la información del perro que quieres agregar.
          </p>

          <input
            type="file"
            className="form-control mb-2"
            onChange={(e) => {
              const file = e.target.files[0]; // Asignamos el archivo seleccionado a la variable 'file'
              console.log("Evento de cambio activado");

              if (file) {
                console.log("Archivo seleccionado:", file);
                setImageFile(file); // Usamos la variable 'file' para actualizar el estado 'imageFile'
              } else {
                console.log("No se ha seleccionado ningún archivo.");
              }
            }}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Ingresa el nombre del perro"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <textarea
            className="form-control mb-2"
            placeholder="Descripción del perro"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="De donde nos saluda?"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
          <input
            type="tel"
            className="form-control mb-2"
            placeholder="Número telefónico o whatsapp +502"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
          />

          <button className="btn btn-primary m-2" onClick={handleUpload}>
            Subir
          </button>
          <button className="btn btn-secondary m-2" onClick={onClose}>
            Cerrar
          </button>
          {mensaje && <p className="mt-2">{mensaje}</p>}
        </div>
      </div>
    </div>
  );
}

export default Modal;
