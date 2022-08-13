import { LockOutlined, MailOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, Navigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
    var inputEmail, inputPwd;
    const[errorMsg, setErrorMsg] = useState("");
  const [userDetail, setUserDetail] = useState({
    email: "",
    password: "",
  });
  const info = m => {
    message.info(m);
  };
  const auth = getAuth();

  const onRegister = event => {
    event.preventDefault();
    if (!userDetail.email || !userDetail.password) {
      info("Please Fill All Fields");
      setErrorMsg('Please Fill All Fields')
    } else {
      createUserWithEmailAndPassword(auth, userDetail.email, userDetail.password)
        .then(userCredential => {
          // Signed in
        //   const user = userCredential.user;
          info('User Created Successfully')
          inputEmail = '';
          inputPwd = '';
          Navigate('/');
          // ...
        })
        .catch(error => {
          const errorMessage = error.message;
          setErrorMsg(errorMessage)
          // ..
        });
    }
  };
  return (
    <div className='loginPage'>
      <Form className='login-form'>
        <Form.Item>
          <Input
            prefix={<MailOutlined />}
            type='email'
            value={inputEmail}
            onChange={event => setUserDetail(prev => ({ ...prev, email: event.target.value }))}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<LockOutlined />}
            type='password'
            value={inputPwd}
            onChange={event => setUserDetail(prev => ({ ...prev, password: event.target.value }))}
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
        <b>{errorMsg}</b>

          <Button type='primary' htmlType='submit' onClick={onRegister} className='login-form-button'>
            Register
          </Button>
          Or <Link to='/login'>Login</Link>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
