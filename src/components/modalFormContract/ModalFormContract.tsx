import axios from "axios";
import { Fragment, useState, ChangeEvent } from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import { Client } from "../../common/InterfaceClient";
import { InterfaceContract } from "../../common/InterfaceContract";
import { API_URL } from "../../App";
import { Link } from "react-router-dom";

interface Props {
  client: Client;
  contracts: InterfaceContract[];
}

const ModalFormContract = ({ client, contracts }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedDoc, setSelectedDoc] = useState<number>(1);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedDoc(parseInt(e.target.value, 10));
    console.log(selectedDoc);
  };

  const getcontracts = () => {
    axios
      .get<Blob>(API_URL + "contracts/" + client.pk + "/" + selectedDoc + "/", {
        responseType: "blob"
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "contracts.docx");
        document.body.appendChild(link);
        link.click();
      });
  };

  const toggle = () => {
    console.log(client);
    console.log(contracts);
    setVisible(!visible);
  };

  let button = (
    <Button color="primary" onClick={toggle}>
      Сформировать договор
    </Button>
  );

  return (
    <Fragment>
      {button}
      <Modal isOpen={visible} toggle={toggle}>
        <ModalHeader style={{ justifyContent: "center" }}>
          Сформировать договор
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="select_template">Шаблон</Label>
            <Input
              id="select_template"
              name="select"
              type="select"
              onChange={onChange}
            >
              {!contracts || contracts.length <= 0 ? (
                <option>Пока что не загружено ни одного шаблона</option>
              ) : (
                contracts.map((doc) => {
                  return (
                    <option key={doc.pk} value={doc.pk}>
                      {doc.name}
                    </option>
                  );
                })
              )}
            </Input>
          </FormGroup>
          {contracts && contracts.length <= 0 ? (
            <Button onClick={toggle}>Отмена</Button>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link to={"/form-contract/" + client.pk + "/" + selectedDoc}>
                <Button color="primary">Перейти к оформлению</Button>
              </Link>
              <Button onClick={toggle}>Отмена</Button>
            </div>
          )}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ModalFormContract;
