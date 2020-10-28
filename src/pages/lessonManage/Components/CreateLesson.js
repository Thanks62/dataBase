import React from 'react';
import {
  Row,
  Col,
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
import { createLesson, editLesson } from '../../../services/lesson';
import { getOccupation } from '../../../services/occupation';
import moment from 'moment';
export default class Create extends React.Component {
  state = {
    fileUrl: '',
    teacherList: [],
    teacherId: '',
    occupationList: [],
    occupationNo: '',
  };
  formRef = React.createRef();
  createLesson = (value) => {
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
  editLesson = (value) => {
    Object.assign(value, { lessonID: this.props.data.lessonID });
    editLesson(value)
      .then((res) => {
        if (res.status === 200) {
          message.success(`课程 - ${value.lessonName} 修改成功!`);
        } else {
          message.error('修改失败');
        }
      })
      .catch((err) => {
        message.error(`错误：${err}`);
      });
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
    console.log(value);
    if (this.props.from == 'edit') this.editLesson(value);
    else this.createLesson(value);
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
    console.log(value);
    this.setState({
      teacherId: option.key,
    });
  };
  handleSelect2 = (value, option) => {
    this.setState({
      occupationNo: option.key,
    });
  };
  componentDidUpdate() {
    if (this.props.from == 'edit') {
      this.formRef.current.resetFields();
    }
  }
  render() {
    const { fileUrl, teacherList, occupationList } = this.state;
    const { from, data } = this.props;
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
      <Form ref={this.formRef} validateMessages={validateMessages} onFinish={this.submit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="lessonName"
              label="课程名"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={data?.lessonName}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lessonImg"
              label="课程封面"
              initialValue={data?.lessonImg}
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
                value={fileUrl}
                onChange={this.handleChange}
                suffix={
                  <Upload {...props} showUploadList={false} accept=".jpeg,.jpg,.png">
                    <UploadOutlined />
                  </Upload>
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              initialValue={[
                moment(data?.lessonBegin || new Date(), 'YYYY/MM/DD'),
                moment(data?.lessonLast || new Date(), 'YYYY/MM/DD'),
              ]}
              name="lessonLast"
              label="开课时间"
              {...rangeConfig}
            >
              <DatePicker.RangePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lessonCost"
              label="课程售价"
              initialValue={data?.lessonCost}
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
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="讲师" name="teacher">
              <Select
                defaultValue={data?.Teacher?.teacherName}
                style={{ width: 230 }}
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
          </Col>
          <Col span={12}>
            <Form.Item label="所属职业类型" name="occupationNo">
              <Select
                defaultValue={data?.Occupation?.occupationName}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => {
                  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }}
              >
                {occupationList?.map((item) => {
                  return (
                    <Select.Option value={item.occupationNo}>{item.occupationName}</Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="lessonPeriod"
              label="总课时"
              initialValue={data?.lessonPeriod}
              rules={[
                {
                  type: 'number',
                },
                {
                  required: true,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="lessonIntro" label="课程简介" initialValue={data?.lessonIntro}>
              <Input.TextArea allowClear />
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          {from == 'edit' ? '编辑' : '创建课程'}
        </Button>
      </Form>
    );
  }
}
