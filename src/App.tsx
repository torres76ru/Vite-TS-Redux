import { Navigate, Route, Routes } from "react-router-dom";
import Clients from "./pages/clients/Clients";
import Contracts from "./pages/contracts/Contracts";
import Tags from "./pages/tags/Tags";
import { useState } from "react";
import FormContract from "./pages/formContract/FormContract";
import "./App.scss";

import { Provider } from "react-redux";
import store from "./store";
import Login from "./pages/login/Login";
import Layout from "./components/layout/Layout";
import { Client } from "./common/InterfaceClient";
import { InterfaceContract } from "./common/InterfaceContract";
import { InterfaceTag } from "./common/InterfaceTag";

export const API_URL = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [clients, setClients] = useState<Client[]>([]);
  const [contracts, setContracts] = useState<InterfaceContract[]>([]);
  const [tags, setTags] = useState<InterfaceTag[]>([]);

  return (
    <>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/clients" />} />
            <Route
              path="/clients/"
              element={
                <Clients
                  clients={clients}
                  setClients={setClients}
                  contracts={contracts}
                />
              }
            />
            <Route
              path="/contracts/"
              element={
                <Contracts contracts={contracts} setContracts={setContracts} />
              }
            />
            <Route
              path="/tags/"
              element={<Tags tags={tags} setTags={setTags} />}
            />
            <Route
              path="/form-contract/:id_client/:id_contract"
              element={<FormContract />}
            />
            <Route path="/login/" element={<Login />} />
          </Routes>
        </Layout>
      </Provider>
    </>
  );
}

export default App;
