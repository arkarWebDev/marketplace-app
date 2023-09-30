import { Form, Input, message } from "antd";

import { loginUser, registerUser } from "../apicalls/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AuthForm = ({ isLoginPage }) => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleOnFinish = async (values) => {
    setSubmitting(true);
    if (isLoginPage) {
      try {
        const response = await loginUser(values);
        console.log(response);
        if (response.isSuccess) {
          message.success(response.message);
          localStorage.setItem("token", response.token);
          navigate("/");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    } else {
      try {
        const response = await registerUser(values);
        if (response.isSuccess) {
          message.success(response.message);
          navigate("/login");
        } else {
          throw new Error(response.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    }
    setSubmitting(false);
  };

  return (
    <section className="h-screen w-full flex items-center justify-center">
      <div className=" w-[450px]">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          POINT.IO - {isLoginPage ? "LOGIN" : "REGISTER"}
        </h1>
        <Form layout="vertical" onFinish={handleOnFinish}>
          {!isLoginPage && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name must contains.",
                },
                {
                  min: 3,
                  message: "Name must have 3 characters.",
                },
              ]}
              hasFeedback
            >
              <Input placeholder="name ..."></Input>
            </Form.Item>
          )}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Email must contains.",
              },
              {
                type: "email",
                message: "Enter a valid E-mail !",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="email ..."></Input>
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Password must contains.",
              },
              {
                min: 5,
                message: "Password must have 5 characters.",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="password ..."></Input.Password>
          </Form.Item>
          <Form.Item>
            <button
              className="w-full outline-none bg-blue-600 text-white py-2 rounded-md"
              disabled={submitting}
            >
              {isLoginPage && !submitting && "Login"}
              {!isLoginPage && !submitting && "Register"}
              {submitting && "Submitting"}
            </button>
          </Form.Item>
          <p>
            {isLoginPage ? (
              <p>
                Don't have an account ?{" "}
                <Link
                  to={"/register"}
                  className=" font-medium text-blue-600 hover:text-blue-600"
                >
                  Register here
                </Link>
              </p>
            ) : (
              <p>
                Already have an account ?{" "}
                <Link
                  to={"/login"}
                  className=" font-medium text-blue-600 hover:text-blue-600"
                >
                  Login here
                </Link>
              </p>
            )}
          </p>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
