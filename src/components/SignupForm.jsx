import React, { useState } from "react";
import { Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import ThemeButton from "./Button";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const SignupForm = ({ registerUser }) => {
  const [clientReady, setClientReady] = useState(false);
  const [form] = Form.useForm();
  const { theme } = useTheme();

  return (
    <div className="d-flex">
      <Form
        name="trigger"
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          marginTop: "50px",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={registerUser}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label={<span style={{  backgroundColor: theme === 'dark' ? '#23272f' : '#fff', color: theme === 'dark' ? '#fff' : '',   fontWeight: 'bold' }}>Email</span>}
          name="email"
          validateTrigger="onBlur"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Enter valid email address",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            className="input-border"
          />
        </Form.Item>

        <Form.Item
         label={<span style={{  backgroundColor: theme === 'dark' ? '#23272f' : '#fff', color: theme === 'dark' ? '#fff' : '',   fontWeight: 'bold' }}>Password</span>}
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 6,
              message: "Password must be greater than 6 charachter",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password "
            className="input-border"
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <ThemeButton title={"Create Free Account"} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <span className="text">Already member?</span>
          <span>
            {" "}
            <Link className="text-primary" to={"/login"}>
              Log In{" "}
            </Link>{" "}
          </span>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignupForm;
