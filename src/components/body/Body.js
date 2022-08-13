import { Card, Col, List, message, Row, Tag, Timeline, Typography } from "antd";
import "./body.css";
import { Button, Form, Input, Radio, Select } from "antd";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { DeleteOutlined } from "@ant-design/icons";

function Body() {
  const [type, settnType] = useState([]);
  const [category, settnCat] = useState([]);
  const [title, setTitle] = useState([]);
  const [amount, setAmount] = useState([]);

  //   const [iType, setItnType] = useState([]);
  const [iTitle, setITitle] = useState([]);
  const [iAmount, setIAmount] = useState([]);
  var date = Date();

  const ontnTypeChange = ({ layout }) => {
    settnType(layout);
  };
  const {Text} = Typography;
  const { Option } = Select;
  const handleChange = value => {
    // console.log(` ${value}`);
    settnCat(value);
  };
  var payload;
  const onAdd = event => {
    event.preventDefault();
    setITitle([...title, iTitle]);
    setIAmount([...amount, iAmount]);
    payload = { title, amount, category, type, date };
    console.log(payload);

    setTitle("");
    setAmount("");

    createTransaction();
  };
  const info = (m) => {
    message.info(m);
  };
  const createTransaction = event => {
    let postRef = db.collection("transactions");

    postRef.add(payload).then(function (docRef) {
      console.log("Success");
      info('Transaction added');
    });
  };
  var total = 0;
  const [transactionData, setTransactionData] = useState([]);
  useEffect(() => {
    db.collection("transactions").onSnapshot(snapshot => {
      setTransactionData(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  const deleteData = (id) => {
    db.collection("transactions").doc(id).delete();
    info('Transaction Deleted')
  };

  return (
    <Row
      style={{
        padding: "3em",
      }}
    >
      <Col
        span={6}
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={6}
        style={{
          padding: "1em",
        }}
      >
        <div className='site-card-border-less-wrapper'>
          <Card title='Overview' bordered={false}>
            <p>Transactions {transactionData?.map(({ id, data }) => (
                
                total = total + parseInt(data.amount)
            ))}</p>

          </Card>
        </div>
      </Col>
      <Col
        span={12}
        xs={24}
        sm={24}
        md={12}
        lg={12}
        xl={12}
        style={{
          padding: "1em",
        }}
      >
        <List>
          {transactionData?.map(({ id, data }) => (
            
            <List.Item style={{textAlign: "left", }} key={id}>
              {/* <PlusCircleFilled style={{ marginRight: "10px", }}/> */}
              <List.Item.Meta title={data.title}  description={data.category}/>
              <Tag hidden={!data.type} color={ data.type === 'Expense' ? 'magenta' : 'green' }>{data.type}</Tag>
              <Typography><Text>{data.amount}</Text></Typography>
              <DeleteOutlined className="" onClick={() => {
                    deleteData(id);
                  }} />
            </List.Item>
          ))}
        </List>
        <Timeline mode='left'>
        {transactionData?.map(({ id, data }) => (
                <Timeline.Item key={id} label=''>{data.category}</Timeline.Item>
            ))}
       
      </Timeline>
      </Col>
      <Col
        span={6}
        xs={24}
        sm={24}
        md={6}
        lg={12}
        xl={6}
        style={{
          padding: "1em",
        }}
      >
        <Form onValuesChange={ontnTypeChange}>
          <Form.Item name='layout'>
            <Radio.Group value={type} initialValue='Expense'>
              <Radio.Button value='Expense'>Expense</Radio.Button>
              <Radio.Button value='Income'>Income</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Input placeholder='Title' type='text' required value={title} onChange={event => setTitle(event.target.value)} />
          </Form.Item>
          <Form.Item>
            <Input type='number' required placeholder='Amount' value={amount} onChange={event => setAmount(event.target.value)} />
          </Form.Item>
          <Form.Item>
            <Select
              defaultValue='Select'
              style={{
                textAlign: "left",
              }}
              onChange={handleChange}
            >
              <Option value='Food'>Food</Option>
              <Option value='Bills'>Bills</Option>
              <Option value='Groceries'>Groceries</Option>
              <Option value='Health'>Health</Option>
              <Option value='Investment'>Investment</Option>
              <Option value='Travel'>Travel</Option>
              <Option value='EMI'>EMI</Option>
              <Option value='Shopping'>Shopping</Option>
              <Option value='Other'>Other</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button disabled={!amount || !title } type='primary' onClick={onAdd}>
              ADD
            </Button>
          </Form.Item>
        </Form>
      </Col>

    </Row>
  );
}

export default Body;
