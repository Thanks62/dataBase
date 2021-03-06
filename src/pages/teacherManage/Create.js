import React from 'react';
import { Form, Upload, Input, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getTeacher, createTeacher } from '../../services/teacher';

export default class Create extends React.Component {
  state = {
    fileUrl: '',
  };
  submit = (value) => {
    createTeacher(value)
      .then((res) => {
        if (res.status === 200) {
          message.success(`讲师 - ${value.teacherName} 创建成功!`);
        } else {
          message.error('创建失败');
        }
      })
      .catch((err) => {
        message.error(`错误：${err}`);
      });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleFileChange = (info) => {
    let file = [...info.fileList];
    info.fileList = file.slice(-1);
    if (info.fileList.status === 'done') {
      message.success(`${info.fileList.name} file uploaded successfully`);
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
        this.setState({ fileUrl: file.url });
      }
    } else if (info.fileList.status === 'error') {
      message.error(`${info.fileList.name} file upload failed.`);
    }
  };
  componentDidMount() {
    getTeacher().then((data) => {
      this.setState({
        teacherList: data,
      });
    });
  }
  handleSelect = (value, option) => {
    this.setState({
      teacherId: option.key,
    });
  };
  render() {
    const { fileUrl } = this.state;
    const validateMessages = {
      required: '${label}为必填项',
      types: {
        number: '${label}应为整数',
        url: '${label}应为链接形式',
      },
    };
    const rangeConfig = {
      rules: [{ type: 'array', required: true }],
    };
    const props = {
      //   name: 'file',
      //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      //   headers: {
      //     authorization: 'authorization-text',
      //   },
      onChange: this.handleFileChange,
    };
    return (
      <Form validateMessages={validateMessages} onFinish={this.submit}>
        <Form.Item
          name="teacherName"
          label="讲师名"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input style={{ width: 260 }} />
        </Form.Item>
        <Form.Item
          name="teacherId"
          label="工号"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input style={{ width: 260 }} />
        </Form.Item>
        <Form.Item
          name="teacherImg"
          label="头像"
          rules={[
            {
              type: 'url',
            },
          ]}
        >
          <Input
            placeholder="头像地址"
            style={{ width: 260 }}
            value={fileUrl}
            onChange={this.handleChange}
            suffix={
              <Upload {...props} showUploadList={false} accept=".jpeg,.jpg,.png">
                <UploadOutlined />
              </Upload>
            }
          />
        </Form.Item>
        <Form.Item name="teacherIntro" label="讲师简介">
          <Input.TextArea allowClear style={{ width: 400 }} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          创建
        </Button>
      </Form>
    );
  }
}
