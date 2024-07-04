import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";

type ForgotPasswordFormInputs = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputs>({
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormInputs> = (
    values: ForgotPasswordFormInputs
  ) => {
    try {
      const { email } = values;
      const data = localStorage.getItem("details") as string;
      const userMaster = JSON.parse(data);
      const user = userMaster.find(
        (user: { email: string; password: string }) => user.email === email
      );
      if (user) {
        setTimeout(() => {
          navigate(`/reset-password?EmailId=${email}`);
        }, 700);
      } else {
        alert("Email not found");
      }
    } catch (error) {
      console.log("Failed to forgot your password");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="form-heading text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <input type="email" {...field} />}
          />
          <p className="error-message">{errors.email?.message}</p>
        </div>
        <div className="text-center mb-2">
          <button className="button" type="submit">
            Reset Password
          </button>
        </div>
        <div className="text-center mb-3">
          <Link to="/">Remembered your password? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
