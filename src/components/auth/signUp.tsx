import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import { Form, FormGroup } from "react-bootstrap";

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
    <div className="auth-container">
      <h2 className="form-heading text-center">Sign Up</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup className="form-group mb-3">
          <Form.Label>Email</Form.Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <Form.Control type="email" {...field} />}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </FormGroup>
        <Form.Group className="form-group mb-3">
          <Form.Label>Password</Form.Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Form.Control type="password" {...field} />}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-group mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => <Form.Control type="password" {...field} />}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <div className="text-center mb-2">
          <button className="button" type="submit">
            Sign Up
          </button>
        </div>
        <div className="text-center mb-3">
          <Link to="/">Already have an account? Login </Link>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
