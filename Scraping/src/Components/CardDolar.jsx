import React from "react";

export const CardDolar = ({ titulo, compra, venta }) => {
  return (
    <div className="col">
      <div className="card m-2 text-center">
        <div className="card-body d-flex flex-column align-items-center">
          <h5 className="card-title">{titulo}</h5>
          <div className="card-text d-flex justify-content-start ">
            <div className="p-2">
              <h6>Compra</h6>
              <p>{compra === 0 ? "-" : compra}</p>
            </div>
            <div className="p-2">
              <h6>Venta</h6>
              <p>{venta}</p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
