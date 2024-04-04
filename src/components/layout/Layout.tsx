import { Fragment, ReactNode, useEffect } from "react";
import Header from "../header/Header";
import { connect } from "react-redux";
import { checkAuthenticated } from "../../actions/auth";
import { load_user } from "../../actions/profile";

interface Props {
  children: ReactNode;
  checkAuthenticated: any;
  load_user: any;
}

const Layout = ({ children, checkAuthenticated, load_user }: Props) => {
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

  return (
    <Fragment>
      <Header />
      {children}
    </Fragment>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
