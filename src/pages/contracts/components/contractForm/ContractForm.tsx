import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { InterfaceContract } from "../../../../common/InterfaceContract";
import { useRef } from "react";
import { API_URL } from "../../../../App";
import Cookies from "js-cookie";
import axios from "axios";
import CSRFToken from "../../../../components/CSRFToken/CSRFToken";

interface Props {
  contract?: InterfaceContract;
  resetState: () => void;
  toggle: () => void;
}

const ContractForm = (props: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitDataLoad = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    const name = (document.getElementById("name") as HTMLInputElement).value; // Получаем значение поля 'Наименование договора'
    const file = fileInputRef.current?.files?.[0]; // Получаем файл из поля выбора файла

    if (!name || !file) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    formData.append("name", name);
    formData.append("file", file);

    await axios
      .post(API_URL + "contracts/load/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookies.get("csrftoken")
        }
      })
      .then(() => {
        props.resetState();
        props.toggle();
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
        alert("ERROR::Request failed");
      });
  };

  return (
    <Form onSubmit={submitDataLoad}>
      <CSRFToken />
      <FormGroup>
        <Label for="name">Наименование договора</Label>
        <Input type="text" name="fio" id="name" required />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">Выберите файл формата .docx</Label>
        <Input
          id="exampleFile"
          name="file"
          type="file"
          innerRef={fileInputRef}
          required
        />
      </FormGroup>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button>Загрузить</Button>
        <Button onClick={props.toggle}>Отмена</Button>
      </div>
    </Form>
  );
};

export default ContractForm;
