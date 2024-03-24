import axios from "axios";
import { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { API_URL } from "../../../../App";

interface Props {
  pk: number;
  resetState: () => void;
}

const RemoveContract = ({ resetState, pk }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggle = () => {
    setVisible(!visible);
  };

  const deleteContract = () => {
    axios.delete(API_URL + "contracts/" + pk).then(() => {
      resetState();
      toggle();
    });
    setVisible(!visible);
  };

  return (
    <>
      <Button color="danger" onClick={() => toggle()}>
        Удалить
      </Button>
      <Modal isOpen={visible} toggle={toggle}>
        <ModalHeader style={{ justifyContent: "center" }}>
          Вы уверены?
        </ModalHeader>
        <ModalBody style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="button" onClick={() => deleteContract()} color="danger">
            Удалить
          </Button>
          <Button type="button" onClick={() => toggle()}>
            Отмена
          </Button>
        </ModalBody>
      </Modal>
    </>
  );
};

export default RemoveContract;
