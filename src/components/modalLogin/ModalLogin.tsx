import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
// import { State } from "../../reducers/auth";

interface ModalLoginProps {
  isAuthentificated: boolean | null;
  username: string;
  logout: () => void;
}

const ModalLogin = ({
  isAuthentificated,
  username,
  logout
}: ModalLoginProps) => {
  const authLinks = (
    <>
      <p>{username}</p>
      <Link onClick={logout} to={"/home"}>
        Logout
      </Link>
    </>
  );
  const guestLinks = (
    <>
      <Link to="/login">Login</Link>
    </>
  );

  return <>{isAuthentificated ? authLinks : guestLinks}</>;
};

const mapStateToProps = (state: any) => ({
  isAuthentificated: state.auth.isAuthentificated,
  username: state.profile.username
});

export default connect(mapStateToProps, { logout })(ModalLogin);
