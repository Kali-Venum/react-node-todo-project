import { Navigate } from "react-router-dom";

const AuthRoute = (props) => {
  const children = props.children;
  let user= localStorage.getItem("user");
  if (user !== null) {
    user = JSON.parse(user);
    if (user.role === "user") {
      return <Navigate to="/login" replace />;
    } else {
      return children;
    }
  } else {
    return children;
  }
};

export default AuthRoute;