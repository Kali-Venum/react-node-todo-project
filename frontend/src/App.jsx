import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import AuthRoute from "./RouteGuard/auth.route";
import ProtectedRoute from "./RouteGuard/protected.route";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        {routes.map((item) => {
          return item?.protected ? (
            <Route
              path={item.path}
              element={<ProtectedRoute children={item.component} />}
            />
          ) : item?.protected === false ? (
            <Route
              path={item.path}
              element={<AuthRoute children={item.component} />}
            />
          ) : (
            <Route path={item.path} element={item.component} />
          );
        })}
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
