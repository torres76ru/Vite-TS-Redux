import { Container } from "reactstrap";
import { InterfaceContract } from "../../common/InterfaceContract";
import ListContracts from "./components/listContracts/ListContracts";
import axios from "axios";
import { API_URL } from "../../App";
import { useEffect, useState } from "react";

interface Props {
  contracts: InterfaceContract[];
  setContracts: (contracts: InterfaceContract[]) => void;
}

const Contracts = (props: Props) => {
  const [loadState, setLoadState] = useState<boolean>(false);

  useEffect(() => {
    getContracts();
  }, []);

  const getContracts = () => {
    axios
      .get(API_URL + "contracts/load/")
      .then((data) => {
        props.setContracts(data.data);
        setLoadState(true);
      })
      .catch(() => {
        props.setContracts([]);
        setLoadState(false);
      });
  };

  const resetState = () => {
    getContracts();
  };
  return (
    <Container>
      {loadState && (
        <ListContracts contracts={props.contracts} resetState={resetState} />
      )}
    </Container>
  );
};

export default Contracts;
