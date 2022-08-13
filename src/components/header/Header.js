import { UserOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";

function Header() {
  return (
    <header className='App-header'>
      <Row >
        <Col
          style={{
            width: "50vw",
            textAlign: "left",
            padding: '10px'
          }}
        >
          <Link to='/'><img src={logo} className='App-logo' alt='logo' /></Link>
        </Col>
        <Col
          style={{
            width: "50vw",
            textAlign: "right",
            padding: '10px'
          }}
        >
          <Link to='/Login'><Button type='primary' shape='circle'  icon={<UserOutlined />} /></Link>
        </Col>
      </Row>
    </header>
  );
}

export default Header;
