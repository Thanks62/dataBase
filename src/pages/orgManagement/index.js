import React from 'react';
import { Card, Table, Button, Spin, message } from 'antd';
import { getOrg } from '../../services/org';
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
    getOrg().then((res) => {
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
        title: '机构编号',
        dataIndex: 'orgID',
        key: 'lessonOrderNo',
        width: 160,
      },
      {
        title: '机构名称',
        width: 160,
        dataIndex: 'orgName',
        key: 'orgName',
      },
      {
        title: '机构地址',
        width: 260,
        dataIndex: 'orgAddress',
        key: 'orgAddress',
      },
      {
        title: '机构电话',
        width: 150,
        dataIndex: 'orgPhone',
        key: 'orgPhome',
      },
      {
        title: '机构业务',
        width: 230,
        dataIndex: 'business',
        key: 'business',
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
