import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";

type ResetPasswordFormInputs = {
  password: string;
  confirmPassword: string;
};

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const schema = yup.object().shape({
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>({
    mode: "onBlur",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = (
    values: ResetPasswordFormInputs
  ) => {
    try {
      const { password } = values;
      const data = localStorage.getItem("details") as string;
      const searchParams = new URLSearchParams(location.search);
      const EmailId = searchParams.get("EmailId");
      const userMaster = JSON.parse(data);
      const updatedUserMaster = userMaster.map((item: any) => {
        if (item.email === EmailId) {
          return { ...item, password };
        }
        return item;
      });
      localStorage.setItem("details", JSON.stringify(updatedUserMaster));
      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (error) {
      console.log("Failed to reset your password");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="form-heading text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>New Password</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <input type="email" {...field} />}
          />
          <p className="error-message">{errors.password?.message}</p>
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => <input type="email" {...field} />}
          />
          <p className="error-message">{errors.confirmPassword?.message}</p>
        </div>
        <div className="text-center mb-2">
          <button className="button" type="submit">
            Submit
          </button>
        </div>
        <div className="text-center mb-3">
          <Link to="/">Remembered your password? Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
