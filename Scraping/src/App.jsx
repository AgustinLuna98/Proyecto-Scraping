import { useState, useEffect } from "react";
import { dolarApi } from "./dolarApi.js";

import { CardDolar } from "./Components/CardDolar.jsx";

function App() {
  const [dolarData, setDolarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dolarApi.get("dolaresDB");
        setDolarData(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Dolares</h1>
      <div className="d-flex justify-content-center">
        <div className="row row-cols-3 w-75">
          {dolarData.map(({ id, Titulo, Compra, Venta }) => (
            <CardDolar key={id} titulo={Titulo} compra={Compra} venta={Venta} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
