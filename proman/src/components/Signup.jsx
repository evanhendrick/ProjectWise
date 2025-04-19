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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white rounded-xl shadow-md p-6 md:p-10">
    <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-gray-800">
      Welcome to Momentum Hub
    </h2>

    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* username */}
      <div>
        <label htmlFor="username" className="block text-sm md:text-base mb-1 font-medium text-gray-700">
          Username
        </label>
        <input
          {...register("username")}
          className="w-full px-4 py-2 border rounded-lg text-sm md:text-base focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* password */}
      <div>
        <label htmlFor="password" className="block text-sm md:text-base mb-1 font-medium text-gray-700">
          Password
        </label>
        <input
          {...register("password")}
          className="w-full px-4 py-2 border rounded-lg text-sm md:text-base focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm md:text-base hover:bg-blue-700 transition"
      >
        Sign In
      </button>
    </form>

    <div className="mt-6 text-center">
      <p className="text-gray-600">or</p>
      <button
        onClick={() => navigate("/signup")}
        className="mt-2 inline-flex items-center gap-2 text-blue-600 hover:underline text-sm md:text-base"
      >
        <FaUserPlus />
        Create a new user
      </button>
    </div>
  </div>
</div>
  );
}
