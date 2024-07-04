import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

type LoginFormInputs = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
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
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (
    values: LoginFormInputs
  ) => {
    try {
      const { email, password } = values;
      const data = localStorage.getItem("details") as string;
      const userMaster = JSON.parse(data);
      const user = userMaster.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );
      if (user) {
        navigate("./dashboard/card");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log("Failed to login");
    }
  };

  return (
    <div className="d-flex auth-container">
      <h2 className="form-heading text-center">Login</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="form-group mb-3">
          <Form.Label>Email</Form.Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Form.Control
                type="email"
                {...field}
                isInvalid={!!errors.email}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group mb-3">
          <Form.Label>Password</Form.Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Form.Control
                type="password"
                {...field}
                isInvalid={!!errors.password}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <div className=" text-center mb-2">
          <button className="button" type="submit">
            Submit
          </button>
        </div>
        <div className="text-center mb-3">
          <Link to="/forgot-password">Forgot Password?</Link> |{" "}
          <Link to="/sign-up">Sign Up</Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
