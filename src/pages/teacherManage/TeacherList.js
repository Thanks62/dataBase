import React from 'react';
import { Table, Button, Spin, Modal, message, Avatar } from 'antd';
import { getTeacher, deleteTeacher } from '../../services/teacher';
import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import EditCard from './Components/EditTeacher';
const { confirm } = Modal;
export default class TeacherList extends React.Component {
  state = {
    data: [],
    loading: true,
    btnStatus: false,
    visible: false,
    editData: {},
  };
  componentDidMount() {
    this.fetchTeacher();
  }
  fetchTeacher = () => {
    this.setState({
      loading: true,
    });
    getTeacher()
      .then((data) => {
        this.setState({
          data,
          loading: false,
          btnStatus: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          btnStatus: false,
        });
      });
  };
  handleFresh = () => {
    this.setState({
      btnStatus: true,
    });
    this.fetchTeacher();
  };
  hideEditForm = () => {
    this.setState({
      visible: false,
    });
  };
  showEditForm = (record) => {
    this.setState({
      visible: true,
      editData: record,
    });
  };
  showDeleteConfirm(params) {
    let that = this;
    confirm({
      title: '确定删除讲师?',
      icon: <ExclamationCircleOutlined />,
      content: '删除后该讲师讲授的课程讲师将置为空',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteTeacher(params)
          .then((res) => {
            message.success('删除成功');
            that.fetchTeacher();
          })
          .catch((err) => {
            message.error(`发生错误:${err}`);
          });
      },
      onCancel() {},
    });
  }
  render() {
    const { data, loading, btnStatus, visible, editData } = this.state;
    const columns = [
      {
        title: '讲师头像',
        dataIndex: 'teacherImg',
        key: 'teacherImg',
        width: 160,
        render: (text, record) => (
          <div>
            {text ? (
              <Avatar size={64} style={{ flexShrink: 0 }} src={text} />
            ) : (
              <Avatar size={64} style={{ flexShrink: 0 }} icon={<UserOutlined />} />
            )}
          </div>
        ),
      },
      {
        title: '讲师',
        width: 160,
        dataIndex: 'teacherName',
        key: 'teacherName',
      },
      {
        title: '工号',
        width: 160,
        dataIndex: 'teacherId',
        key: 'teacherId',
      },
      {
        title: '讲师简介',
        width: 230,
        dataIndex: 'teacherIntro',
        key: 'teacherIntro',
      },
      {
        title: '操作',
        width: 100,
        fixed: 'right',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => (
          <div style={{ lineHeight: '16px' }}>
            <a
              onClick={() => {
                this.showEditForm(record);
              }}
            >
              编辑
            </a>
            <br />
            <a
              onClick={() => {
                this.showDeleteConfirm(record.teacherNo);
              }}
            >
              删除
            </a>
          </div>
        ),
      },
    ];
    return (
      <>
        <Button
          onClick={this.handleFresh}
          loading={btnStatus}
          disabled={btnStatus}
          style={{ marginBottom: 16 }}
          type="primary"
        >
          刷新
        </Button>
        <Spin spinning={loading}>
          <Table columns={columns} dataSource={data} />
        </Spin>
        <EditCard onClose={this.hideEditForm} visible={visible} data={editData} />
      </>
    );
  }
}
