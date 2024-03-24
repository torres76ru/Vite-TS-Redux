import { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import { API_URL } from "../../../../App";
import axios from "axios";

interface Props {
  resetState: () => void;
}
const AddTag = ({ resetState }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [tagName, setTagName] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTagName(value);
  };
  const toggle = () => {
    setVisible(!visible);
  };

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      tag_name: tagName
    };
    console.log(data);
    await axios
      .post(API_URL + "tags/", data, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(() => {
        resetState();
        toggle();
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
        alert("ERROR::Request failed");
      });
  };

  return (
    <>
      <Button
        color="primary"
        className="float-right"
        style={{ minWidth: "200px" }}
        onClick={() => toggle()}
      >
        Добавить метку
      </Button>
      <Modal isOpen={visible} toggle={toggle}>
        <ModalHeader style={{ justifyContent: "center" }}>
          Добавить метку
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={submitData}>
            <FormGroup>
              <Label for="tagName">Название</Label>
              <Input
                type="text"
                name="tagName"
                onChange={onChange}
                placeholder="tag будет определена как $(tag)"
                defaultValue={""}
              />
            </FormGroup>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button>Добавить</Button>
              <Button onClick={toggle}>Отмена</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default AddTag;
