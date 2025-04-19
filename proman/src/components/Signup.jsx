import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitSignin } from "../app/slices/authSlice";
import { Link } from "react-router-dom";
import _ from "lodash";
import { authActions } from "../app/slices/authSlice";
import { FaUserPlus } from 'react-icons/fa'

export default function Signup() {
  const form = useForm();
  const { register, handleSubmit, formState, clearErrors } = form;
  const { errors } = formState;

  const authState = useSelector((state) => {
    return state.storeAuth;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // event.preventDefault();
    try {
      const res = await dispatch(submitSignin(data));
      if (res.type === "auth/submitSignin/fulfilled") {
        console.log("Signin fulfilled!");
        localStorage.getItem("token");
        navigate("/user");
      } else {
        console.log("res.type !== fulfilled");
      }
    } catch (err) {
      console.log("res.type !== fulfilled");
      return err;
    }
  };

  const handleClearErrors = () => {
    if (authState.error) {
      clearErrors("username");
      clearErrors("password");
      dispatch(authActions.resetError());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-xl shadow-md p-6 md:p-10">
          <h3 className="text-xl md:text-2xl font-bold mb-6 text-center text-gray-800">Welcome to Momentum Hub!</h3>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <label htmlFor="username" className="block text-sm md:text-base mb-1 font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Must enter a username",
                  },
                  validate: {
                    notAdmin: (fieldValue) => {
                      return (
                        fieldValue !== "admin" ||
                        "You cannot have this username"
                      );
                    },
                  },
                })}
                onChange={(e) => {
                  register("username").onChange(e);
                  handleClearErrors();
                }}
                className="w-full px-4 py-2 border rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></input>
              {errors.username ? (
                <p className="text-sm text-red-600 mt-1">{errors.username?.message}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm md:text-base mb-1 font-medium text-gray-700">
                Password
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                id="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Must enter a password",
                  },
                })}
                onChange={(e) => {
                  register("password").onChange(e);
                  handleClearErrors();
                }}
              ></input>
              {errors.password ? (
                <p className="text-sm text-red-600 mt-1">{errors.password?.message}</p>
              ) : null}
              {authState.error ? (
                <p className="text-sm text-red-600 mt-1">{authState.error}</p>
              ) : null}
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm md:text-base hover:bg-blue-700 transition duration-200">Submit</button>
            </form>

            <div className="mt-6 text-center">
            <p className="text-gray-600">or</p>
            <button
            className="mt-2 inline-flex items-center gap-2 text-blue-600 hover:underline text-sm md:text-base"
              onClick={() => {
                navigate('/signup')
              }}
              >
              <FaUserPlus />
              Create a new user
              </button>
            </div>
        </div>
        </div>
  );
}
