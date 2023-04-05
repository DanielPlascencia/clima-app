import React from "react";
import Formulario from "./Formulario";
import Resultado from "./Resultado";
import Spinner from "./Spinner";
import useClima from "../hooks/useClima";

export default function AppClima() {
  const { resultado, cargando, noResultados } = useClima();
  return (
    <>
      <main className="dos-columnas">
        <Formulario />
        {cargando ? (
          <Spinner />
        ) : resultado?.name ? (
          <Resultado />
        ) : noResultados ? (
          <p>{noResultados}</p>
        ) : (
          ""
        )}
      </main>
    </>
  );
}
