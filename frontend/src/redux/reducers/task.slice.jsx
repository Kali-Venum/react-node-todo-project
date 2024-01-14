import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../constants/config";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  tasksData: [],
  pageNumber: 1,
  limit: 10,
  dataCount: 10,
};

export const createTask = createAsyncThunk(
  "/api/task/create",
  async (user, { rejectWithValue }) => {
    const tokens = localStorage.getItem("tokens");
    const accessToken = JSON.parse(tokens).access.token;

    console.log(accessToken, "accessToken");

    try {
      const response = await axios.post(`${API_URL}/task/create`, user, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateATask = createAsyncThunk(
  "/api/task/update",
  async (data, { rejectWithValue }) => {
    const tokens = localStorage.getItem("tokens");
    const accessToken = JSON.parse(tokens).access.token;

    const {taskId, taskData} = data;

    try {
      const response = await axios.patch(`${API_URL}/task/update/${taskId}`, taskData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllTasks = createAsyncThunk(
  "/api/task/get",
  async (data, { rejectWithValue }) => {
    const tokens = localStorage.getItem("tokens");
    const accessToken = JSON.parse(tokens).access.token;

    try {
      const response = await axios.get(`${API_URL}/task/get`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.result.data;
        toast.success(payload.serverResponse.message);
      })
      .addCase(createTask.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.message);
      })
      .addCase(updateATask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateATask.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.result.data;
        toast.success(payload.serverResponse.message);
      })
      .addCase(updateATask.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.message);
      })
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tasksData = payload.result.data;
      })
      .addCase(getAllTasks.rejected, (state, { payload }) => {
        state.isLoading = false;
        localStorage.removeItem("user");
        localStorage.removeItem("tokens");
        window.location.reload();
      });
  },
});

export default taskSlice.reducer;
