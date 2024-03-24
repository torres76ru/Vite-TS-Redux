import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem, Container } from "reactstrap";
import ModalLogin from "../modalLogin/ModalLogin";

const Header = () => {
  return (
    <Navbar
      color="dark"
      dark
      expand="md"
      style={{ borderBottom: "2px solid grey" }}
    >
      <Container>
        <Link to="/" className="navbar-brand">
          Aurelius
        </Link>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </NavItem>
          {/* <NavItem>
            <Link to="/clients" className="nav-link">Clients</Link>
          </NavItem> */}
          <NavItem>
            <Link to="/contracts" className="nav-link">
              Contracts
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/tags" className="nav-link">
              Tags
            </Link>
          </NavItem>
        </Nav>
        <ModalLogin />
      </Container>
      <hr />
    </Navbar>
  );
};

export default Header;
