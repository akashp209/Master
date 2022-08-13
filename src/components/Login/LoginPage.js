import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  const info = m => {
    message.info(m);
  };
  const auth = getAuth();

  const onLogin = event => {
    event.preventDefault();
    if (!userDetail.email || !userDetail.password) {
      info("Please Fill All Fields");
      setErrorMsg("Please Fill All Fields");
    } else {
      signInWithEmailAndPassword(auth, userDetail.email, userDetail.password)
        .then(userCredential => {
          // Signed in
          info("Logged In Successfully");
          Navigate("/");
          // ...
        })
        .catch(error => {
          const errorMessage = error.message;
          setErrorMsg(errorMessage);
          // ..
        });
    }
  };
  return (
    <div className='loginPage'>
      <Form className='login-form'>
        <Form.Item>
          <Input prefix={<UserOutlined />} onChange={(event) => setUserDetail((prev) => ({ ...prev, email: event.target.value }))
          } placeholder='Email' />
        </Form.Item>
        <Form.Item>
          <Input prefix={<LockOutlined />} onChange={(event) => setUserDetail((prev) => ({ ...prev, password: event.target.value }))
          } type='password' placeholder='Password' />
        </Form.Item>
        <Form.Item>
          <b>{errorMsg}</b>
          <Checkbox>Remember me</Checkbox>
          <Button type='primary' htmlType='submit' onClick={onLogin} className='login-form-button'>
            Log in
          </Button>
          <Link to='/'>Home</Link>
          Or <Link to='/register'>register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
