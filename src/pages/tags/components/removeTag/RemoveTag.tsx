import axios from "axios";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { API_URL } from "../../../../App";
import { useState } from "react";

interface Props {
  pk: number;
  resetState: () => void;
}

const RemoveTag = ({ pk, resetState }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const toggle = () => {
    setVisible(!visible);
  };

  const deleteTag = () => {
    axios.delete(API_URL + "tags/" + pk).then(() => {
      resetState();
      toggle();
    });
    setVisible(!visible);
  };

  return (
    <>
      <Button type="button" onClick={() => toggle()} color="danger">
        Удалить
      </Button>
      <Modal isOpen={visible} toggle={toggle}>
        <ModalHeader style={{ justifyContent: "center" }}>
          Вы уверены?
        </ModalHeader>
        <ModalBody style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="button" onClick={() => deleteTag()} color="danger">
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

export default RemoveTag;
