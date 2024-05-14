import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBarComponent from "../components/NavBarComponent";
import ProductTableCRUD from "../components/ProductTableCRUD";
import SuppliersTableCRUD from "../components/SuppliersTableCRUD";
import ProductsEndpoint from "../hook/ProductsEndpoint";
import { get } from "react-hook-form";
const ProductObject = new ProductsEndpoint(import.meta.env.VITE_REACT_APP_BASE_API);

export const Administrador = () => {
  

  return (
    <>
      <NavBarComponent cartShoppingIcon={false} seeBarIcon={true} />
      <div className="yellow template justify-content-center align-items-center 100-w vh-100 ">
        {/** ---------- CRUD PRODUCTOS  ---------- */}
        <div className="container">
          <div className='card'>
            <div className='card-header' id="myTab" role="tablist">
              <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Registrados"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    PRODUCTOS
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#NoRegistrados"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    PROVEEDORES
                  </button>
                </li>
              </ul>
            </div>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="Registrados"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                {/*********** Registrados **********/}
                <ProductTableCRUD />
              </div>
              <div
                className="tab-pane fade"
                id="NoRegistrados"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                {/* No registrados */}
              <SuppliersTableCRUD />
              </div>
            </div>
          </div>
          {/* Aquí va el código de la página */}
        </div>
      </div>
    </>
  );
};