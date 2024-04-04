import React, { useEffect, useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Cookies from "js-cookie";
import axios from "axios";
import { Client } from "../../../../common/InterfaceClient";
import { API_URL } from "../../../../App";
import CSRFToken from "../../../../components/CSRFToken/CSRFToken";

interface Props {
  client?: Client;
  resetState: () => void;
  toggle: () => void;
}

const ClientForm = (props: Props) => {
  const [client, setClient] = useState<Client>({
    pk: 0,
    fio: "",
    email: "",
    nickname: "",
    birthday: "",
    birth_place: "",
    passport_1: "",
    passport_2: "",
    given: "",
    given_date: "",
    code: "",
    reg_address: "",
    INN: "",
    SNILS: "",
    credit: "",
    bank_name: "",
    bik: "",
    korr_schet: ""
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value
    }));
  };

  useEffect(() => {
    if (props.client) {
      setClient(props.client);
    }
  }, [props.client]);

  const defaultIfEmpty = (value: string) => {
    return value === "" ? "" : value;
  };

  const submitDataEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios
      .put(API_URL + "clients/" + client.pk, client, {
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
  const submitDataAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      fio: client["fio"],
      email: client["email"],
      nickname: client["nickname"],
      birthday: client["birthday"],
      birth_place: client["birth_place"],
      passport_1: client["passport_1"],
      passport_2: client["passport_2"],
      given: client["given"],
      given_date: client["given_date"],
      code: client["code"],
      reg_address: client["reg_address"],
      INN: client["INN"],
      SNILS: client["SNILS"],
      credit: client["credit"],
      bank_name: client["bank_name"],
      bik: client["bik"],
      korr_schet: client["korr_schet"]
    };
    await axios
      .post(API_URL + "clients/", data, {
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
    <Form onSubmit={props.client ? submitDataEdit : submitDataAdd}>
      <CSRFToken />
      <FormGroup>
        <Label for="fio">ФИО</Label>
        <Input
          type="text"
          name="fio"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.fio)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.email)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="nickname">Псевдоним</Label>
        <Input
          type="text"
          name="nickname"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.nickname)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="birthday">Дата рождения</Label>
        <Input
          type="text"
          name="birthday"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.birthday)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="birth_place">Место рождения</Label>
        <Input
          type="text"
          name="birth_place"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.birth_place)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="passport_1">Паспорт</Label>
        <Row>
          <Col>
            <Input
              type="text"
              name="passport_1"
              onChange={onChange}
              defaultValue={defaultIfEmpty(client.passport_1)}
            />
          </Col>
          <Col>
            <Input
              type="text"
              name="passport_2"
              onChange={onChange}
              defaultValue={defaultIfEmpty(client.passport_2)}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Label for="given">Выдан</Label>
        <Input
          type="text"
          name="given"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.given)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="given_date">Дата выдачи</Label>
        <Input
          type="text"
          name="given_date"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.given_date)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="code">Код подразделения</Label>
        <Input
          type="text"
          name="code"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.code)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="reg_address">Адрес регистрации</Label>
        <Input
          type="text"
          name="reg_address"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.reg_address)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="INN">ИНН</Label>
        <Input
          type="text"
          name="INN"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.INN)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="SNILS">СНИЛС</Label>
        <Input
          type="text"
          name="SNILS"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.SNILS)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="credit">Номер счета в банке</Label>
        <Input
          type="text"
          name="credit"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.credit)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="bank_name">Наименование банка</Label>
        <Input
          type="text"
          name="bank_name"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.bank_name)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="bik">БИК</Label>
        <Input
          type="text"
          name="bik"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.bik)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="korr_schet">к/с</Label>
        <Input
          type="text"
          name="korr_schet"
          onChange={onChange}
          defaultValue={defaultIfEmpty(client.korr_schet)}
        />
      </FormGroup>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button>Отправить</Button>{" "}
        <Button onClick={props.toggle}>Отмена</Button>
      </div>
    </Form>
  );
};

export default ClientForm;
