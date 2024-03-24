import { Container } from "reactstrap";
import ListClients from "./components/listClients/ListClients";
import { Client } from "../../common/InterfaceClient";
import { InterfaceContract } from "../../common/InterfaceContract";

interface Props {
  clients: Client[];
  resetState: () => void;
  contracts: InterfaceContract[];
}

const Clients = (props: Props) => {
  return (
    <Container>
      <ListClients
        clients={props.clients}
        resetState={props.resetState}
        contracts={props.contracts}
      ></ListClients>
    </Container>
  );
};

export default Clients;
