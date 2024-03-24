import { Container } from "reactstrap";
import { InterfaceContract } from "../../common/InterfaceContract";
import ListContracts from "./components/listContracts/ListContracts";

interface Props {
  contracts: InterfaceContract[];
  resetState: () => void;
}

const Contracts = (props: Props) => {
  return (
    <Container>
      <ListContracts
        contracts={props.contracts}
        resetState={props.resetState}
      />
    </Container>
  );
};

export default Contracts;
