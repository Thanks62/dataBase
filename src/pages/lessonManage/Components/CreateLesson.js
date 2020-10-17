import React from 'react';
import {
  Form,
  Upload,
  Input,
  InputNumber,
  DatePicker,
  Select,
  Tooltip,
  Button,
  Avatar,
  message,
} from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { getTeacher } from '../../../services/teacher';
import { createLesson } from '../../../services/lesson';
import { getOccupation } from '../../../services/occupation';

export default class Create extends React.Component {
  state = {
    fileUrl: '',
    teacherList: [],
    teacherId: '',
    occupationList: [],
    occupationNo: '',
  };
  submit = (value) => {
    const rangeValue = value['lessonLast'];
    const lessonBegin = rangeValue[0].format('YYYY-MM-DD');
    const lessonLast = rangeValue[1].format('YYYY-MM-DD');
    const data = {
      lessonBegin,
      lessonLast,
      teacherId: this.state.teacherId ? Number(this.state.teacherId) : null,
    };
    Object.assign(value, value, data);
    createLesson(value)
      .then((res) => {
        if (res.status === 200) {
          message.success(`课程 - ${value.lessonName} 创建成功!`);
          this.props.changeBtnStatus(false);
          this.props.setCurrentLesson(res.lessonID);
          this.props.next();
        } else {
          message.error('创建失败');
          this.props.changeBtnStatus(true);
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
        teacherList: data ? data : [],
      });
    });
    getOccupation().then((res) => {
      this.setState({
        occupationList: res.data,
      });
    });
  }
  handleSelect = (value, option) => {
    this.setState({
      teacherId: option.key,
    });
  };
  handleSelect2 = (value, option) => {
    this.setState({
      occupationNo: option.key,
    });
  };
  render() {
    const { fileUrl, teacherList, occupationList } = this.state;
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
          name="lessonName"
          label="课程名"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input style={{ width: 260 }} />
        </Form.Item>
        <Form.Item name="lessonIntro" label="课程简介">
          <Input.TextArea allowClear />
        </Form.Item>
        <Form.Item
          name="lessonImg"
          label="课程封面"
          rules={[
            {
              required: true,
            },
            {
              type: 'url',
            },
          ]}
        >
          <Input
            placeholder="封面地址"
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
        <Form.Item name="lessonLast" label="开课时间" {...rangeConfig}>
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item
          name="lessonPeriod"
          label="总课时"
          rules={[
            {
              type: 'number',
            },
            {
              required: true,
            },
          ]}
        >
          <InputNumber style={{ width: 260 }} />
        </Form.Item>
        <Form.Item label="讲师" name="teacher">
          <Select
            style={{ width: 260 }}
            showSearch
            optionLabelProp="value"
            optionFilterProp="value"
            filterOption={(input, option) => {
              return (
                option.children[option.children.length - 1]
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              );
            }}
            onChange={this.handleSelect}
          >
            {teacherList?.map((item) => {
              return (
                <Select.Option key={item.teacherId} value={item.teacherName}>
                  {item.teacherImg ? (
                    <Avatar src={item.teacherImg} />
                  ) : (
                    <Avatar icon={<UserOutlined />} />
                  )}{' '}
                  {item.teacherName}
                </Select.Option>
              );
            })}
          </Select>
          <Tooltip title="请到讲师管理目录下添加讲师">
            <a href="#API" style={{ margin: '0 8px' }}>
              找不到?
            </a>
          </Tooltip>
        </Form.Item>
        <Form.Item label="所属职业类型" name="occupationNo">
          <Select
            style={{ width: 260 }}
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => {
              return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
            }}
          >
            {occupationList?.map((item) => {
              return <Select.Option value={item.occupationNo}>{item.occupationName}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="lessonCost"
          label="课程售价"
          rules={[
            {
              type: 'number',
            },
            {
              required: true,
            },
          ]}
        >
          <InputNumber style={{ width: 260 }} suffix="RMB" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          创建课程
        </Button>
      </Form>
    );
  }
}
