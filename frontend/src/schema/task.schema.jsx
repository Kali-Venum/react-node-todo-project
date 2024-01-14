import * as Yup from "yup";

export const createTaskSchema = Yup.object({
    name: Yup.string().required("Please enter the task name."),
    description: Yup.string().required("Please enter the task description."),
  });
  