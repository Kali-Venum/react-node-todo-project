import React, { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/auth.schema";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/reducers/auth.slice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,

      onSubmit: async (values, action) => {
        const value = await dispatch(loginUser(values));

        if (value.type === "/api/auth/login/fulfilled") {
          navigate("/get-all-tasks");
        } else {
          return;
        }
        action.resetForm();
      },
    });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <h3 className="text-4xl font-bold text-purple-600">Login</h3>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-[#fff] border border-[#d5d5d5] text-[#000] sm:text-sm focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 rounded-[7px]"
                />
              </div>
              {errors.email && touched.email ? (
                <p className="text-[#FF0000] text-sm">{`*${errors.email}`}</p>
              ) : null}
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-[#fff] border border-[#d5d5d5] text-[#000] sm:text-sm focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 rounded-[7px]"
                />
                <button
                  type="button"
                  className="view-password-button px-2 absolute right-0 top-3"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <BiShow /> : <BiHide />}
                </button>
              </div>
              {errors.password && touched.password ? (
                <p className="text-[#FF0000] text-sm">{`*${errors.password}`}</p>
              ) : null}
            </div>
            <div className="flex items-center justify-end mt-4">
              <Link
                to={"/register"}
                className="text-sm text-gray-600 underline hover:text-gray-900"
              >
                Register
              </Link>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
