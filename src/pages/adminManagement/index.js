import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Card, Table, Button, Spin, message, Avatar } from 'antd';
import { getAllAdmin } from '../../services/user';
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
    getAllAdmin().then((res) => {
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
        title: '头像',
        width: 100,
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text) => (
          <>
            {text ? <Avatar size={64} src={text} /> : <Avatar size={64} icon={<UserOutlined />} />}
          </>
        ),
      },
      {
        title: '管理员编号',
        dataIndex: 'adminID',
        key: 'adminID',
        width: 160,
      },
      {
        title: '管理员名称',
        width: 160,
        dataIndex: 'adminName',
        key: 'adminName',
      },
      {
        title: '联系电话',
        width: 230,
        dataIndex: 'adminPhone',
        key: 'adminPhone',
      },
      {
        title: '职工编号',
        width: 200,
        dataIndex: 'adminNo',
        key: 'adminNo',
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
