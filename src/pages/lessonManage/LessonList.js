import React from 'react';
import { Table, Button, Spin, Modal, message } from 'antd';
import { getLesson, deleteLesson } from '../../services/lesson';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import EditLesson from './Components/EditLesson';
const { confirm } = Modal;
function DateFormatter(text) {
  const date = new Date(text);
  return <div>{date.toLocaleDateString()}</div>;
}
export default class LessonList extends React.Component {
  state = {
    data: [],
    loading: true,
    btnStatus: false,
    visible: false,
    editData: {},
  };
  componentDidMount() {
    this.fetchLesson();
  }
  fetchLesson = () => {
    this.setState({
      loading: true,
    });
    getLesson()
      .then((data) => {
        this.setState({
          data,
          loading: false,
          btnStatus: false,
        });
      })
      .catch((err) => {
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
    this.fetchLesson();
  };
  showDeleteConfirm(params) {
    let that = this;
    confirm({
      title: '确定删除此课程?',
      icon: <ExclamationCircleOutlined />,
      content: '删除后该课程将会下架，与该课程有关的教学资源也会一并删除！',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteLesson(params)
          .then((res) => {
            message.success('删除成功');
            that.fetchLesson();
          })
          .catch((err) => {
            message.error(`发生错误:${err}`);
          });
      },
      onCancel() {},
    });
  }
  onCloseModal = () => {
    this.setState({
      visible: false,
    });
  };
  onOpenModal = (record) => {
    this.setState({
      visible: true,
      editData: record,
    });
  };
  render() {
    const { data, loading, btnStatus, visible, editData } = this.state;
    const columns = [
      {
        title: '课程封面',
        dataIndex: 'lessonImg',
        key: 'lessonImg',
        width: 160,
        render: (text, record) => <img width="120px" src={text} alt={record.lessonName} />,
      },
      {
        title: '课程名',
        width: 160,
        dataIndex: 'lessonName',
        key: 'lessonName',
      },
      {
        title: '课程简介',
        width: 230,
        dataIndex: 'lessonIntro',
        key: 'lessonIntro',
      },
      {
        title: '总学时',
        width: 100,
        dataIndex: 'lessonPeriod',
        key: 'lessonPeriod',
      },
      {
        title: '讲师',
        width: 120,
        dataIndex: 'Teacher',
        key: 'teacherName',
        render: (text) => <div>{text?.teacherName}</div>,
      },
      {
        title: '报名人数',
        width: 120,
        dataIndex: 'lessonStuNum',
        key: 'lessonStuNum',
      },
      {
        title: '价格',
        width: 120,
        dataIndex: 'lessonCost',
        key: 'lessonCost',
      },
      {
        title: '开始时间',
        width: 220,
        dataIndex: 'lessonBegin',
        key: 'lessonBegin',
        render: (text, record) => DateFormatter(text),
      },
      {
        title: '结束时间',
        width: 220,
        dataIndex: 'lessonLast',
        key: 'lessonLast',
        render: (text, record) => DateFormatter(text),
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
                this.onOpenModal(record);
              }}
            >
              编辑
            </a>
            <br />
            <a
              onClick={() => {
                this.showDeleteConfirm(record.lessonID);
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
          <Table columns={columns} scroll={{ x: 1500 }} dataSource={data} />
        </Spin>
        <EditLesson onClose={this.onCloseModal} visible={visible} data={editData} />
      </>
    );
  }
}
