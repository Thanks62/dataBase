import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Card, Table, Button, Spin, message, Avatar } from 'antd';
import { getAllMember } from '../../services/user';
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
    getAllMember().then((res) => {
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
        title: '会员编号',
        dataIndex: 'memberID',
        key: 'memberID',
        width: 160,
      },
      {
        title: '会员昵称',
        width: 160,
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '会员名称',
        width: 160,
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '联系电话',
        width: 230,
        dataIndex: 'userPhone',
        key: 'userPhone',
      },
      {
        title: '身份证号',
        width: 230,
        dataIndex: 'idNum',
        key: 'idNum',
      },
      {
        title: '学校',
        width: 150,
        dataIndex: 'school',
        key: 'school',
      },
      {
        title: '邮箱',
        width: 200,
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '性别',
        width: 100,
        dataIndex: 'sexual',
        key: 'sexual',
      },
      {
        title: '生日',
        width: 230,
        dataIndex: 'birthday',
        key: 'birthday',
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
