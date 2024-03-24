import { Navigate, Route, Routes } from "react-router-dom";
import Clients from "./pages/clients/Clients";
import Contracts from "./pages/contracts/Contracts";
import Tags from "./pages/tags/Tags";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import FormContract from "./pages/formContract/FormContract";
import "./App.scss";
export const API_URL = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [clients, setClients] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getClients();
  }, []);
  useEffect(() => {
    getContracts();
  }, []);
  useEffect(() => {
    getTags();
  }, []);

  const getClients = () => {
    axios.get(API_URL + "clients/").then((data) => {
      setClients(data.data);
    });
  };
  const getContracts = () => {
    axios.get(API_URL + "contracts/load/").then((data) => {
      setContracts(data.data);
    });
  };
  const getTags = () => {
    axios.get(API_URL + "tags/").then((data) => {
      setTags(data.data);
    });
  };

  const resetState = () => {
    getClients();
    getContracts();
    getTags();
  };

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/clients" />} />
        <Route
          path="/clients/"
          element={
            <Clients
              clients={clients}
              resetState={resetState}
              contracts={contracts}
            />
          }
        />
        <Route
          path="/contracts/"
          element={<Contracts contracts={contracts} resetState={resetState} />}
        />
        <Route
          path="/tags/"
          element={<Tags tags={tags} resetState={resetState} />}
        />
        <Route
          path="/form-contract/:id_client/:id_contract"
          element={<FormContract />}
        />
      </Routes>
    </>
  );
}

export default App;
