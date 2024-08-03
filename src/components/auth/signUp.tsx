import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

type SignUpFormInputs = {
  email: string;
  password: string;
  confirmPassword?: string;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignUpFormInputs> = (
    values: SignUpFormInputs
  ) => {
    try {
      const { email, password } = values;
      const existingData = localStorage.getItem("details");
      const data = existingData ? JSON.parse(existingData) : [];
      const isUserExist = data.find((item: any) => item.email === email);
      if (isUserExist) {
        alert("User already exist");
      } else {
        data.push({ email, password });
        localStorage.setItem("details", JSON.stringify(data));
        setTimeout(() => {
          navigate("/");
        }, 700);
      }
    } catch (error) {
      console.log("Failed to sign-up");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        className="w-[23rem] max-w-md bg-white p-8 pt-4 rounded-lg shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                type="email"
                {...field}
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            )}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                {...field}
                className={`w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                {...field}
                className={`w-full px-3 py-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            )}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="text-center mb-4">
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700"
          >
            Sign Up
          </button>
        </div>
        <div className="text-center">
          <Link to="/" className="text-gray-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
