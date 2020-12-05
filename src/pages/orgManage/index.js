import React from 'react';
import { Card, Form, Input, Button, message, Spin } from 'antd';
import { getOrg, editOrg } from '../../services/org.js';
import { connect } from 'umi';
import { stubTrue } from 'lodash';
class OrgManage extends React.Component {
  state = {
    org: [],
    loading: true,
  };
  formRef = React.createRef();

  getOrgByID = () => {
    getOrg({ orgID: this.props.employee.orgID }).then((res) => {
      if (res.status == 'ok') {
        this.setState({
          org: res.data,
          loading: false,
        });
      } else {
        message.error('获取机构信息失败！');
        this.setState({
          loading: false,
        });
      }
    });
  };
  componentDidMount() {
    this.getOrgByID();
  }
  componentDidUpdate() {
    this.formRef.current.resetFields();
  }
  submit = (value) => {
    Object.assign(value, { orgID: this.props.employee.orgID });
    this.setState({
      loading: true,
    });
    editOrg(value).then((res) => {
      if (res.status == 'ok') {
        message.success('修改信息成功！');
      } else {
        message.error('修改信息失败！');
      }
      this.setState({
        loading: false,
      });
    });
  };
  render() {
    const { org, loading } = this.state;
    const validateMessages = {
      required: '${label}为必填项',
      types: {
        number: '${label}应为整数',
        url: '${label}应为链接形式',
      },
    };
    return (
      <Card>
        <Spin spinning={loading}>
          <Form ref={this.formRef} validateMessages={validateMessages} onFinish={this.submit}>
            <Form.Item
              initialValue={org[0]?.orgName}
              name="orgName"
              label="机构名"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input style={{ width: 260 }} disabled />
            </Form.Item>
            <Form.Item
              initialValue={org[0]?.orgPhone}
              name="orgPhone"
              label="机构电话"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input style={{ width: 260 }} />
            </Form.Item>
            <Form.Item
              initialValue={org[0]?.orgAddress}
              name="orgAddress"
              label="机构地址"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input style={{ width: 260 }} />
            </Form.Item>
            <Form.Item
              initialValue={org[0]?.business}
              name="business"
              label="主营业务"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea style={{ width: 320 }} />
            </Form.Item>
            <Button type="primary" htmlType="submit" disabled={loading}>
              修改
            </Button>
          </Form>
        </Spin>
      </Card>
    );
  }
}
export default connect(({ user }) => ({
  employee: user.currentUser,
}))(OrgManage);
