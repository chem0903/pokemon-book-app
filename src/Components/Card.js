import React from "react";
import "./Card.css"

const Card = (props) => {
    const { pokemon: pokemon } = props;

    return (
        <div className="card">
            <div className="cardImg">
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <h3 className="cardName">{pokemon.name}</h3>
            <div className="cardType">
                <div>タイプ</div>
                {pokemon.types.map((type, index) => {
                    return (<div key={index}>
                        <span className="typeName">{type.type.name}</span>
                    </div>)
                })}
            </div>
            <div className="cardInfo">
                <div className="cardData">
                    <p className="title">重さ : {pokemon.weight} kg</p>
                </div>
                <div className="cardData">
                    <p className="title">高さ : {pokemon.height} m</p>
                </div>
                <div className="cardData">
                    <p className="title">技 : {pokemon.abilities[0].ability.name}</p>
                </div>
            </div>

        </div>
    );
};

export default Card;
