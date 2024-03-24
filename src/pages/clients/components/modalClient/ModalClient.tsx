import { useState } from "react";
import { Client } from "../../../../common/InterfaceClient";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import ClientForm from "../clientForm/ClientForm";

interface Props {
  client?: Client;
  resetState: () => void;
}
const ModalClient = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const toggle = () => {
    setVisible(!visible);
  };

  let button = <Button onClick={() => toggle()}>Редактировать</Button>;

  if (!props.client) {
    button = (
      <Button
        color="primary"
        className="float-right"
        onClick={() => toggle()}
        style={{ minWidth: "200px" }}
      >
        Добавить клиента
      </Button>
    );
  }

  return (
    <>
      {button}
      <Modal isOpen={visible} toggle={toggle}>
        <ModalHeader style={{ justifyContent: "center" }}>
          {props.client ? "Редактировать клиента" : "Добавить клиента"}
        </ModalHeader>
        <ModalBody>
          <ClientForm
            client={props.client}
            resetState={props.resetState}
            toggle={toggle}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalClient;
