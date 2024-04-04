import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import { API_URL } from "../../App";
import { useEffect, useState } from "react";
import "./FormContract.scss";
import TableCustom from "./components/TableCustom";
import TableCustom2 from "./components/TableCustom2";
import CSRFToken from "../../components/CSRFToken/CSRFToken";
import Cookies from "js-cookie";

export interface tableMultimedia {
  image: File;
  col2: string;
  col3: string;
}

const FormContract = () => {
  const [tags, setTags] = useState<{ [key: string]: string }>({});

  const [table1, setTable1] = useState<string[][]>([
    ["", "", "", "", "", "", "", ""]
  ]);
  const [table2, setTable2] = useState<tableMultimedia[]>([
    { image: new File([], ""), col2: "", col3: "" }
  ]);

  const { id_client, id_contract } = useParams<{
    id_client: string;
    id_contract: string;
  }>();

  useEffect(() => {
    getTags();
  }, []);

  const getTags = () => {
    axios
      .get(API_URL + "contracts/tags/" + id_contract)
      .then((data) => {
        const initialState: { [key: string]: string } = {};
        data.data.forEach((key: string) => {
          initialState[key] = "";
        });
        console.log(initialState);
        setTags(initialState);
      })
      .catch((error) => {
        console.error("Произошла ошибка:", error);
        alert("ERROR::Request failed ");
      });
  };

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      tags: tags,
      table1: table1,
      table2: table2
    };

    axios
      .post(`${API_URL}contracts/${id_client}/${id_contract}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookies.get("csrftoken")
        },
        responseType: "blob"
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "contract.docx"); // Установите имя файла для загрузки
        document.body.appendChild(link);
        link.click();
      });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTags((prevTags) => ({
      ...prevTags,
      [name]: value
    }));
  };

  return (
    <Container>
      <Form onSubmit={submitData}>
        <CSRFToken />
        {Object.keys(tags).map((key) => (
          <FormGroup key={key}>
            <Label for={key}>{key}</Label>
            <Input type="text" name={key} onChange={onChange} />
          </FormGroup>
        ))}
        <hr />
        <Row>
          <TableCustom rows={table1} setRows={setTable1} />
        </Row>
        <hr />
        <Row>
          <TableCustom2 rows={table2} setRows={setTable2} />
        </Row>
        <hr />
        <Button color="primary" style={{ minWidth: "200px" }}>
          Скачать
        </Button>
      </Form>
    </Container>
  );
};

export default FormContract;
