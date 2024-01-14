import React, { useEffect, useState } from "react";
import { createTaskSchema } from "../../schema/task.schema";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, createTask, updateATask } from "../../redux/reducers/task.slice";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const TaskPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { tasksData } = useSelector((state) => state.taskReducer);
  const [task, setTask] = useState({});
  const [updateTask, setUpdateTask] = useState("")

  const initialValues = {
    name: task?.name ?? "",
    description: task?.description ?? "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      enableReinitialize: true,
      initialValues,
      validationSchema: createTaskSchema,

      onSubmit: async (values, action) => {
        console.log(task, "task")
        if (updateTask) {
          const value = await dispatch(
            updateATask({ taskId: task._id, taskData: values })
          );

          if (value.type === "/api/task/update/fulfilled") {
            action.resetForm();
            modalCloser();
            dispatch(getAllTasks());
          } else {
            action.resetForm();
            return;
          }
        } else {
          const value = await dispatch(createTask(values));

          if (value.type === "/api/task/create/fulfilled") {
            action.resetForm();
            modalCloser();
            dispatch(getAllTasks());
          } else {
            action.resetForm();
            return;
          }
        }
        action.resetForm();
      },
    });

  const modalOpener = () => {
    setUpdateTask("")
    setModal(true);
  };
  const modalCloser = () => {
    setTask({})
    setUpdateTask("")
    setModal(false);
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("tokens");
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  const editModalHandler = (id) => {
    const singleTaskData = tasksData.find((item) => item._id === id);

    setUpdateTask(singleTaskData._id)
    setTask(singleTaskData);
    setModal(true);
  };

  return (
    <div>
      <div className="bd-second-sec">
        <div className="flex gap-7">
          <div className="w-full sm:my-10 my-6 relative px-4">
            <div className="sm:flex justify-end my-3">
              <div className="sm:ml-4 sm:w-28 sm:inline-block flex justify-end w-full sm:mt-0 mt-3">
                <button
                  onClick={modalOpener}
                  className="font-bold p-2 bg-black text-white"
                >
                  Add Task
                </button>
              </div>
              <div className="sm:ml-4 sm:w-28 sm:inline-block flex justify-end w-full sm:mt-0 mt-3">
                <button
                  onClick={logoutHandler}
                  className="font-bold p-2 bg-black text-white"
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="border-[#d1d1d1] border rounded-lg">
              <h3 className="border-b border-[#ecf5ff] text-2xl font-bold bg-gradient-extreme-light px-[8px] py-[10px] text-center">
                Task Table
              </h3>
              <div className="box-table overflow-x-auto">
                <table className="table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left border-b border-[#dbdbdb] font-semibold text-[14px] p-2">
                        <div className="flex items-center">Name</div>
                      </th>
                      <th className="text-left border-b border-[#dbdbdb] font-semibold text-[14px] p-2">
                        <div className="flex items-center">Description</div>
                      </th>
                      <th className="text-left border-b border-[#dbdbdb] font-semibold text-[14px] p-2">
                        <div className="flex items-center">Actions</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasksData?.length > 0
                      ? tasksData?.map((item) => (
                          <tr>
                            <td className="text-left border-b border-[#dbdbdb] p-2">
                              {item.name}
                            </td>
                            <td className="text-left border-b border-[#dbdbdb] p-2">
                              {item.description}
                            </td>
                            <div className="flex">
                              <td
                                className="flex m-2 text-left pointer"
                                onClick={() => editModalHandler(item._id)}
                              >
                                <FiEdit />
                              </td>
                              <td className="flex m-2 text-left">
                                <MdDeleteOutline />
                              </td>
                            </div>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modal ? (
        <div className="fixed z-10 overflow-y-auto top-0 w-full left-0">
          <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <form
              onSubmit={handleSubmit}
              className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <label className="font-medium text-gray-800">Name</label>
                <input
                  type="name"
                  name="name"
                  className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                  value={values?.name || task?.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <p className="text-[#FF0000] text-sm">{`*${errors.name}`}</p>
                ) : null}
                <label className="font-medium text-gray-800">Description</label>
                <input
                  type="description"
                  name="description"
                  className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                  value={values?.description || task?.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description ? (
                  <p className="text-[#FF0000] text-sm">{`*${errors.description}`}</p>
                ) : null}
              </div>
              <div className="bg-gray-200 px-4 py-3 text-right">
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                  onClick={modalCloser}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-black text-white rounded hover:bg-color-subtext mr-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TaskPage;
