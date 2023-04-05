import { useState, createContext } from "react";
import axios from "axios";

const ClimaContext = createContext();

const ClimaProvider = ({ children }) => {
  const [busqueda, setBusqueda] = useState({
    ciudad: "",
    pais: "",
  });
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  const [noResultados, setNoResultados] = useState("");

  const datosBusqueda = (e) => {
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
  };

  const consultarClima = async (datos) => {
    setCargando(true);
    setNoResultados(false);
    try {
      const { ciudad, pais } = datos;
      const appId = "dda7f7c8b6503d8b1b59da744a2f6626";
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=1&appid=${appId}`;

      const { data } = await axios(url);
      const { lat, lon } = data[0];

      const urlClima = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
      const { data: clima } = await axios(urlClima);
      setResultado(clima);
    } catch (error) {
      setNoResultados("No hay resultados");
    } finally {
      setCargando(false);
    }
  };

  return (
    <ClimaContext.Provider
      value={{
        busqueda,
        resultado,
        cargando,
        noResultados,
        datosBusqueda,
        consultarClima,
      }}
    >
      {children}
    </ClimaContext.Provider>
  );
};

export { ClimaProvider };

export default ClimaContext;
