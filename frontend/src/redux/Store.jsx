import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./reducers/auth.slice";
import taskReducer from "./reducers/task.slice";

export const store = configureStore({
  reducer: {
    authReducer,
    taskReducer,
  },
});
