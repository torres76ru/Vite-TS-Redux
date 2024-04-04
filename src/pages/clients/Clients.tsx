import { Container } from "reactstrap";
import ListClients from "./components/listClients/ListClients";
import { Client } from "../../common/InterfaceClient";
import { InterfaceContract } from "../../common/InterfaceContract";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../App";

interface Props {
  clients: Client[];
  setClients: (clients: Client[]) => void;
  contracts: InterfaceContract[];
}

const Clients = (props: Props) => {
  const [loadState, setLoadState] = useState<boolean>(false);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = () => {
    axios
      .get(API_URL + "clients/")
      .then((data) => {
        props.setClients(data.data);
        setLoadState(true);
      })
      .catch(() => {
        props.setClients([]);
        setLoadState(false);
      });
  };

  const resetState = () => {
    getClients();
  };

  return (
    <Container>
      {loadState && (
        <ListClients
          clients={props.clients}
          resetState={resetState}
          contracts={props.contracts}
        ></ListClients>
      )}
    </Container>
  );
};

export default Clients;
