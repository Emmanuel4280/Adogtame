import React from "react";
import Card from "./card";

function CardList({ cards, onCardClick }) {
  return (
    <div className="row">
      {cards.map((card, index) => (
        <div key={index} className="col-md-12 col-lg-3">
          <Card
            nombre={card.nombre}
            imagen={card.imageUrl}
            descripcion={card.descripcion}
            onClick={() => onCardClick(card)}
          />
        </div>
      ))}
    </div>
  );
}

export default CardList;
