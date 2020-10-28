import React from 'react';
import { Form, Input, InputNumber, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createSection, deleteSection, getSection } from '../../../services/lesson';
import SectionList from '@/components/SectionList';
export default class CreateChapter extends React.Component {
  state = {
    fileUrl: '',
    sectionList: [],
    listLoading: true,
  };
  componentDidMount() {
    if (this.props.from == 'edit') {
      this.fetchSections();
    }
  }
  componentWillReceiveProps() {
    if (this.props.from == 'edit') {
      this.fetchSections();
    }
  }
  submit = (value) => {
    const { lessonID } = this.props;
    if (lessonID == 0) {
      message.error('请先创建课程！');
      return;
    }
    Object.assign(value, value, { lessonID });
    createSection(value)
      .then((res) => {
        if (res.status == 200) {
          message.success('创建成功');
          this.fetchSections();
        } else message.error('创建失败');
      })
      .catch((err) => {
        message.error(`发生错误：${err}`);
      });
  };
  fetchSections = () => {
    this.setState({
      listLoading: true,
    });
    if (this.props.lessonID == 0) {
      message.error('请先创建课程！');
      return;
    }
    getSection(this.props.lessonID)
      .then((res) => {
        this.setState({
          sectionList: res.data,
          listLoading: false,
        });
      })
      .catch((err) => {
        message.error(`获取列表失败：${err}`);
        this.setState({
          listLoading: false,
        });
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
  deleteSection = (sectionID) => {
    deleteSection(sectionID)
      .then((res) => {
        if (res.status == 200) {
          message.success('删除成功');
          this.fetchSections();
        } else message.error('删除失败');
      })
      .catch((err) => {
        message.error(`错误：${err}`);
      });
  };
  render() {
    const { fileUrl, sectionList, listLoading } = this.state;
    const { lessonID } = this.props;
    const validateMessages = {
      required: '${label}为必填项',
      types: {
        number: '${label}应为整数',
        url: '${label}应为链接形式',
      },
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
      <>
        <Form validateMessages={validateMessages} onFinish={this.submit}>
          <Form.Item
            name="sectionName"
            label="章节名"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: 260 }} />
          </Form.Item>
          <Form.Item
            name="order"
            label="节顺序"
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
          <Form.Item
            name="duration"
            label="课程时长(min)"
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
          <Form.Item
            name="url"
            label="视频资源"
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
              placeholder="视频资源地址"
              style={{ width: 260 }}
              value={fileUrl}
              onChange={this.handleChange}
              suffix={
                <Upload {...props} showUploadList={false} accept=".mp4,.avi">
                  <UploadOutlined />
                </Upload>
              }
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            创建章节
          </Button>
          <SectionList
            deleteSection={this.deleteSection}
            sectionList={sectionList}
            listLoading={listLoading}
          />
        </Form>
      </>
    );
  }
}
