import { useState } from "react";
import { login } from "../../actions/auth";
import { Navigate } from "react-router-dom";
import CSRFToken from "../../components/CSRFToken/CSRFToken";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
// import { State } from "../../reducers/auth";
import { connect } from "react-redux";

interface Props {
  login: (username: string, password: string) => void;
  isAuthentificated: boolean | null;
}

const Login = ({ login, isAuthentificated }: Props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const { username, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  if (isAuthentificated) return <Navigate to="/clients" />;

  return (
    <div className="container mt-5">
      <h1>Войти</h1>
      <p>Войдите в ваш аккаунт</p>
      <Form onSubmit={(e) => onSubmit(e)}>
        <CSRFToken />
        <FormGroup>
          <Label for="username">Имя пользователя:</Label>
          <Input
            type="text"
            name="username"
            onChange={(e) => onChange(e)}
            value={username}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Пароль:</Label>
          <Input
            type="password"
            name="password"
            onChange={(e) => onChange(e)}
            value={password}
            minLength={6}
            required
          />
        </FormGroup>
        <Button color="primary" className="mt-3" type="submit">
          Войти
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  isAuthentificated: state.auth.isAuthentificated
});

export default connect(mapStateToProps, { login })(Login);
