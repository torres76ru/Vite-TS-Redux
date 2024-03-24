import { useState } from "react";
import { InterfaceContract } from "../../../../common/InterfaceContract";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import ContractForm from "../contractForm/ContractForm";

interface Props {
  contract?: InterfaceContract;
  resetState: () => void;
}
const ModalContract = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const toggle = () => {
    setVisible(!visible);
  };

  let button = <Button onClick={() => toggle()}>Редактировать</Button>;

  if (!props.contract) {
    button = (
      <Button
        color="primary"
        className="float-right"
        onClick={() => toggle()}
        style={{ minWidth: "200px" }}
      >
        Добавить договор
      </Button>
    );
  }

  return (
    <>
      {button}
      <Modal isOpen={visible} toggle={toggle}>
        <ModalHeader style={{ justifyContent: "center" }}>
          {props.contract ? "Редактировать договор" : "Добавить договор"}
        </ModalHeader>
        <ModalBody>
          <ContractForm
            contract={props.contract}
            resetState={props.resetState}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalContract;
