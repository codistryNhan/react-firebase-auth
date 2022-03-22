import React from "react";

//createContext() provides a FirebaseContext.Provider and FirebaseContext.Consumer
const FirebaseContext = React.createContext(null);

export const withFirebase = (Component) => (props) =>
  (
    <FirebaseContext.Consumer>
      {(firebase) => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );

export default FirebaseContext;
