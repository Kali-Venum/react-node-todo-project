import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const children = props.children;
  let user = localStorage.getItem("user");

  if (user !== null) {
    user = JSON.parse(user);
    if (user.role === "user") {
      return children;
    } else {
      return <Navigate to="/login" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
