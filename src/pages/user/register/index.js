import React from 'react';
import { stringify } from 'querystring';
import { history } from 'umi';
import { Col, Row, Form, Upload, Input, Button, DatePicker, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { registerUser } from '../../../services/login';
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
export default class Register extends React.Component {
  state = {
    loading: false,
    imageUrl: null,
    date: null,
  };
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
    }
  };
  handleDate = (date, dateString) => {
    this.setState({
      date: dateString,
    });
  };
  submit = (value) => {
    let res = {};
    Object.assign(res, value, { birthday: new Date(this.state.date) });
    registerUser(res).then((res) => {
      if (res.status == 'ok') {
        if (window.location.pathname !== '/user/login') {
          history.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          });
        }
      } else {
        message.error(`注册失败：${res.message.errors[0].message}`);
      }
    });
  };
  render() {
    const { loading, imageUrl } = this.state;
    const validateMessages = {
      required: '${label}为必填项',
      types: {
        email: '请输入正确邮箱地址',
      },
    };
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Row justify="center">
          <Col span={12}>
            <Row gutter={16}>
              <Col span={24}>
                <Upload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? (
                    <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Col>
            </Row>

            <Form validateMessages={validateMessages} onFinish={this.submit}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    style={{ width: '100px' }}
                    name="name"
                    label="姓名"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input style={{ width: 260 }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    style={{ width: '100px' }}
                    name="userName"
                    label="昵称"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input style={{ width: 260 }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    style={{ width: '100px' }}
                    name="userPhone"
                    label="手机号"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input style={{ width: 260 }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="idNum" style={{ width: '100px' }} label="身份证号">
                    <Input style={{ width: 260 }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    style={{ width: '100px' }}
                    name="userPassword"
                    label="密码"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input style={{ width: 260 }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="school" style={{ width: '100px' }} label="学校">
                    <Input style={{ width: 260 }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    style={{ width: '100px' }}
                    name="email"
                    label="邮箱"
                    rules={[
                      {
                        type: 'email',
                      },
                    ]}
                  >
                    <Input style={{ width: 260 }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="生日" style={{ width: '100px' }}>
                    <DatePicker onChange={this.handleDate} style={{ width: 260 }} />
                  </Form.Item>
                </Col>
              </Row>
              <Button type="primary" htmlType="submit">
                注册会员
              </Button>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}
