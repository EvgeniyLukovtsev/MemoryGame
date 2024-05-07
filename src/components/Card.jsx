import React from "react";
import styles from "./Card.module.css";

const brook = require("../icon/brook.png");
const buggy = require("../icon/buggy.png");
const franky = require("../icon/Cyborg_Franky.png");
const goldroger = require("../icon/Gol_D._Roger.png");
const law = require("../icon/Law.png");
const luffy = require("../icon/Monkey_D._Luffypng.png");
const nami = require("../icon/Nami.png");
const robin = require("../icon/Robin.png");
const sanji = require("../icon/Sanji.png");
const choppr = require("../icon/Tony_Tony_Chopper.png");
const usopp = require("../icon/Usopp.png");
const zoro = require("../icon/Zoro.png");
const onePiece = require("../icon/one_piece.png");

export const initialArrayCards = [
  {
    id: 1,
    img: brook,
  },
  {
    id: 2,
    img: buggy,
  },
  {
    id: 3,
    img: franky,
  },
  {
    id: 4,
    img: goldroger,
  },
  {
    id: 5,
    img: law,
  },
  {
    id: 6,
    img: luffy,
  },
  {
    id: 7,
    img: nami,
  },
  {
    id: 8,
    img: robin,
  },
  {
    id: 9,
    img: sanji,
  },
  {
    id: 10,
    img: choppr,
  },
  {
    id: 11,
    img: usopp,
  },
  {
    id: 12,
    img: zoro,
  },
];

const pairOfArrayCards = [...initialArrayCards, ...initialArrayCards];

export const Card = () => {
  const [arrayCards, setArrayCards] = React.useState([]);
  const [openedCards, setOpenedCards] = React.useState([]);
  const [matched, setMatched] = React.useState([]);
  const [moves, setMoves] = React.useState(0);

  const shuffle = (array) => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  React.useEffect(() => {
    setArrayCards(shuffle(pairOfArrayCards));
  }, []);

  React.useEffect(() => {
    if (openedCards < 2) return;

    const firstMatched = arrayCards[openedCards[0]];
    const secondMatched = arrayCards[openedCards[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched([...matched, firstMatched.id]);
    }

    if (openedCards.length === 2) setTimeout(() => setOpenedCards([]), 1000);
  }, [arrayCards, matched, openedCards]);

  const flipCard = (index) => {
    setOpenedCards((opened) => [...opened, index]);
    setMoves((prevMove) => prevMove + 1);
  };

  const handleGameRestart = () => {
    setOpenedCards([]);
    setMatched([]);
    setMoves(0);
    setArrayCards(shuffle(pairOfArrayCards));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.number_of_strokes}>Сделано ходов: {moves}</p>
        
      </div>
      <div className={styles.cards}>
        {arrayCards.map((item, index) => {
          let isFlipped = false;
          if (openedCards.includes(index)) isFlipped = true;
          if (matched.includes(item.id)) isFlipped = true;
          return (
            <div
              className={`${styles.card} ${isFlipped ? styles.cardActive : ""}`}
              key={index}
              onClick={() => flipCard(index)}
            >
              <div className={styles.inner}>
                <div className={styles.front_img}>
                  <img className={styles.img} src={item.img} alt="img" />
                </div>
                <div className={styles.back_img}>
                  <img src={onePiece} alt="img" width="100" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button className={styles.button_restart} onClick={handleGameRestart}>
        Начать заново
      </button>
    </div>
  );
};
