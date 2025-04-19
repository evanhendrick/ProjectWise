import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { submitSignup } from "../app/slices/authSlice";
import { Link } from "react-router-dom";
import { authActions } from "../app/slices/authSlice";

export const NewUser = () => {
  const form = useForm();
  const { register, handleSubmit, formState, clearErrors } = form;
  const { errors } = formState;

  const navigate = useNavigate();

  const authState = useSelector((state) => {
    return state.storeAuth;
  });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    event.preventDefault();
    try {
      const response = await dispatch(submitSignup(data));
      if (response.type === "auth/submitSignup/fulfilled") {
        alert("New user sucessfully created. Please sign in");
        navigate("/");
      }
    } catch (err) {
      return err;
    }
  };

  const handleClearErrors = () => {
    if (authState.error) {
      clearErrors("username");
      dispatch(authActions.resetError());
    } else {
      console.log("no errors to reset");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-xl shadow-md p-6 md:p-10">
        <div className="mb-4 text-center">
      <button
      onClick={() => {
        navigate('/')
      }}
      className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm md:text-base hover:bg-blue-700 transition">Home</button>
      <h2 className="text-xl md:text-2xl font-bold mt-4 text-gray-800">Welcome to Momentum Hub</h2>
      </div>
          <form
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div>
              <label for="username" className="block text-sm md:text-base mb-1 font-medium text-gray-700">
              Username
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              ></input>
              {errors.username ? (
                <p className="text-red-500 text-sm mt-1">{errors.username?.message}</p>
              ) : null}
              {authState.error ? (
                <p className="text-red-500 text-sm mt-1">{authState.error}</p>
              ) : null}
            </div>

            <div>
              <label for="password" className="block text-sm md:text-base mb-1 font-medium text-gray-700">
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
              ></input>
              {errors.password ? (
                <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
              ) : null}
            </div>

            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg text-sm md:text-base hover:bg-green-700 transition">Submit</button>
          </form>
      </div>
      </div>
  );
};
