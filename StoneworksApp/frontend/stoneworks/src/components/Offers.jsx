import React from 'react';

function Offers() {
  return (
    <div className="offer-container">
      <div className="offer-row">
        <div className="offer-item1">
          <p className="title">
            <img className="ikona" src={`${process.env.PUBLIC_URL}/img/iko.png`} alt="ikona" /><br />
            Sprzedaż kamieni
          </p><br />
          <p className="tekst">
            Jesteśmy specjalistami w sprzedaży różnorodnych rodzajów kamieni naturalnych, takich jak granit, marmur, 
            trawertyn czy piaskowiec. Oferujemy wysokiej jakości kamienie o różnych kolorach i strukturach.
          </p>
        </div>
        <div className="offer-item1">
          <p className="title">
            <img className="ikona2"  src={`${process.env.PUBLIC_URL}/img/iko2.png`} alt="ikona" /><br />
            Obróbka kamieni
          </p><br />
          <p className="tekst">
            Nasz doświadczony zespół kamieniarzy wykonuje profesjonalną obróbkę kamieni według indywidualnych potrzeb klienta.
            Oferujemy cięcie, szlifowanie, polerowanie i wiele innych usług.
          </p>
        </div>
      </div>
      <div className="offer-row">
        <div className="offer-item2">
          <p className="title">
            <img className="ikona2"  src={`${process.env.PUBLIC_URL}/img/iko2.png`} alt="ikona" /><br />
            Renowacja
          </p><br />
          <p className="tekst">
            Jeśli Twoje kamienie straciły swój naturalny blask, mamy rozwiązanie! Przywrócimy im pierwotny wygląd poprzez
            profesjonalną renowację.
          </p>
        </div>
        <div className="offer-item2">
          <p className="title">
            <img className="ikona" src={`${process.env.PUBLIC_URL}/img/iko.png`} alt="ikona" /><br />
            Galeria
          </p><br />
          <p className="tekst">
            Zobacz nasze realizacje w naszym punkcie. Przekonaj się sam, jak wyjątkowe mogą być projekty z wykorzystaniem kamieni naturalnych.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Offers;
