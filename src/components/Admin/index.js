import React from "react";

import { withAuthorization } from "../Session";
import * as ROLES from "../../constants/roles";

const INITIAL_STATE = {
  loading: false,
  users: {},
};

const AdminPage = ({ firebase }) => {
  const [state, setState] = React.useState(INITIAL_STATE);

  React.useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      <p>Restricted page. Only users with the admin role are authorized</p>
    </div>
  );
};

const condition = (authUser) =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default withAuthorization(condition)(AdminPage);
