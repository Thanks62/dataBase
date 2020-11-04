import { Alert, Checkbox } from 'antd';
import React, { useState } from 'react';
import { Link, connect } from 'umi';
import LoginForm from './components/Login';
import styles from './style.less';
const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState('user');

  const handleSubmit = (values) => {
    const { dispatch } = props;
    switch(type){
      case 'user':dispatch({
        type: 'login/loginUser',
        payload: { ...values, type },
      });break;
      case 'employer':dispatch({
        type: 'login/loginEmployer',
        payload: { ...values, type },
      });break;
      case 'admin':dispatch({
        type: 'login/loginAdmin',
        payload: { ...values, type },
      });break;
    }
    
  };

  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="user" tab="会员登录">
          {status === 'error'  && !submitting && (
            <LoginMessage content="账户或密码错误" />
          )}

          <UserName
            name="userName"
            placeholder="用户名: 手机号"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <Tab key="employer" tab="机构职员登录">
          {status === 'error'  && !submitting && (
            <LoginMessage content="账户或密码错误" />
          )}

          <UserName
            name="userName"
            placeholder="用户名: 手机号"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <Tab key="admin" tab="系统管理员登录">
          {status === 'error' && !submitting && (
            <LoginMessage content="账户或密码错误" />
          )}

          <UserName
            name="userName"
            placeholder="用户名: 手机号"
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder="密码"
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
        </Tab>
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
        </div>
        <Submit loading={submitting}>登录</Submit>
        <div className={styles.other}>
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/loginUser'],
}))(Login);
