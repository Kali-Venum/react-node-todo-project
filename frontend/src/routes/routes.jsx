import RegistrationPage from "../pages/Auth/RegistrationPage";
import LoginPage from "../pages/Auth/LoginPage";
import TaskPage from "../pages/Task/TaskPage";
import NoContentPage from "../pages/NoContentPage/NoContentPage";

export const routes = [
  {
    path: "/register",
    component: <RegistrationPage />,
    protected: false,
  },
  {
    path: "/login",
    component: <LoginPage />,
    protected: false,
  },
//   {
//     path: "/create-task",
//     component: <TaskPage />,
//     protected: true,
//   },
  {
    path: "/get-all-tasks",
    component: <TaskPage />,
    protected: true,
  },
  {
    path: "*",
    component: <NoContentPage />,
  },
];
