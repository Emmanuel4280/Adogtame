/* Importamos la hoja de estilos CSS */
import "./styles.css";

/* Importamos los componentes definidos por nosotros */
import NavBar from "./componentes/nav-bar.js";
import React, { useState } from "react";
import Modal from "./componentes/modal.js";
import Details from "./componentes/details.js";
import CardList from "./componentes/cardlist";
import Login from "./componentes/login.js";

/* Firebase: para escuchar cambios en la autenticación */
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./componentes/firebase";

/* Firestore: para guardar y leer las cards */
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./componentes/firebase";

/* Componente principal */
export default function App() {
  /* Estados de la app */

  // Controla si se muestra el modal para subir un perro
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Lista de tarjetas con los perros subidos
  const [cards, setCards] = useState([]);

  // Controla si se muestra el modal con detalles de un perro
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Almacena temporalmente los datos del perro que el usuario seleccionó
  const [selectedCard, setSelectedCard] = useState(null);

  // Estado del usuario autenticado
  const [user, setUser] = useState(null);

  // Controla si está cargando (al iniciar sesión por ejemplo)
  const [loading, setLoading] = useState(true);

  // Indica si debe mostrarse el login manualmente
  const [showLogin, setShowLogin] = useState(false);

  // Función para obtener todas las cards desde Firestore
  const handleAddCard = async (card) => {
    try {
      // Usamos addDoc para agregar la card a Firestore
      await addDoc(collection(db, "cards"), card);
      setCards((prevCards) => [...prevCards, card]); // Actualiza el estado local
      setIsModalOpen(false); // Cierra el modal
      fetchCards(); // Recarga las cards después de añadir una
    } catch (error) {
      console.error("Error al guardar la card:", error);
    }
  };

  //lee las cards de firebase
  const fetchCards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cards"));
      const cardsList = querySnapshot.docs.map((doc) => ({
        id: doc.id, // ID único del documento
        ...doc.data(), // Todos los campos de la card
      }));
      console.log("fetchCards fue llamado");
      setCards(cardsList); // Guardamos las cards en el estado
    } catch (error) {
      console.error("Error al cargar las cards:", error);
    }
  };
  //codigo que funciona saber por que
  useEffect(() => {
    const testRead = async () => {
      try {
        const snapshot = await getDocs(collection(db, "cards"));
        snapshot.docs.forEach((doc) => {
          console.log("CARD:", doc.data());
        });
      } catch (error) {
        console.error("Error al leer las cards:", error);
      }
    };

    testRead();
  }, []);
  // Cargar las cards una vez al montar el componente
  useEffect(() => {
    fetchCards();
  }, []);

  // Escuchar cambios de sesión del usuario (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Guardamos al usuario
      setLoading(false); // Dejamos de mostrar "cargando"
    });

    // Cleanup al desmontar
    return () => unsubscribe();
  }, []);

  // Si aún estamos cargando la sesión y no se pidió el login manual
  if (!user && !showLogin) {
    return <div>Cargando...</div>;
  }

  // Si no hay usuario o se pidió login manual, mostrar el login
  if (showLogin || !user) {
    return (
      <Login
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser); // Guardamos al usuario logueado
          setShowLogin(false); // Ocultamos el login
        }}
      />
    );
  }

  // Función para mostrar manualmente el login desde NavBar
  const goToLogin = () => {
    setShowLogin(true);
  };

  // Función que se llama cuando se sube una nueva card desde el Modal

  // Función que se ejecuta cuando el usuario hace click en una card
  const handleCardClick = (card) => {
    setSelectedCard(card); // Guardamos la card seleccionada
    setIsDetailsModalOpen(true); // Abrimos el modal de detalles
  };

  // Por si alguna condición falló y el usuario no está logueado (redundante)
  if (!user) {
    return <Login onLoginSuccess={(loggedUser) => setUser(loggedUser)} />;
  }

  // Render principal de la app
  return (
    <div className="App">
      {/* Barra de navegación con botón para abrir modal */}
      <NavBar openModal={() => setIsModalOpen(true)} goToLogin={goToLogin} />

      {/* Contenedor visual (Bootstrap/estilizado) */}
      <div className="container mt-5" />

      {/* Lista de cards con perros */}
      <CardList cards={cards} onCardClick={handleCardClick} />

      {/* Modal para subir nuevo perro */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddCard}
        user={user}
      />

      {/* Modal para ver detalles del perro */}
      <Details
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        cardDetails={selectedCard}
      />
    </div>
  );
}
