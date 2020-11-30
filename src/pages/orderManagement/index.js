import React from 'react';
import { Card, Table, Button, Spin, message } from 'antd';
import { getOrder } from '../../services/order';
export default class OrderManage extends React.Component {
  state = {
    data: [],
    btnStatus: false,
    loading: false,
  };
  componentDidMount() {
    this.handleFresh();
  }
  handleFresh = () => {
    this.setState({
      btnStatus: true,
      loading: true,
    });
    getOrder().then((res) => {
      if (res.status == 'ok') {
        this.setState({
          data: res.data ? res.data : [],
          btnStatus: false,
          loading: false,
        });
      } else {
        message.error('获取数据失败');
      }
    });
  };
  render() {
    const { data, btnStatus, loading } = this.state;
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'lessonOrderNo',
        key: 'lessonOrderNo',
        width: 160,
      },
      {
        title: '课程',
        width: 160,
        dataIndex: 'Lesson',
        key: 'Lesson',
        render: (text) => <>{text?.lessonName}</>,
      },
      {
        title: '订单金额',
        width: 160,
        dataIndex: 'Lesson',
        key: 'Lesson',
        render: (text) => <>{text?.lessonCost}</>,
      },
      {
        title: '订单状态',
        width: 230,
        dataIndex: 'lessonOrdStatus',
        key: 'lessonOrdStatus',
      },
      {
        title: '购买会员',
        width: 230,
        dataIndex: 'Member',
        key: 'Member',
        render: (text) => <>{text?.userName}</>,
      },
      {
        title: '订单所属机构',
        width: 230,
        dataIndex: 'Lesson',
        key: 'Lesson',
        render: (text) => <>{text?.Organization?.orgName}</>,
      },
      {
        title: '下单时间',
        width: 230,
        dataIndex: 'lessonOrdTime',
        key: 'lessonOrdTime',
        render: (text) => <>{new Date(text).toLocaleString()}</>,
      },
    ];
    return (
      <Card>
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
      </Card>
    );
  }
}
