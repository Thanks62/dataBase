import { PlusOutlined, HomeOutlined, ContactsOutlined, ClusterOutlined,CalendarOutlined,IdcardOutlined,BankOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Input, Row, Tag } from 'antd';
import React, { Component, useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { Link, connect } from 'umi';
import logo from '../../../public/icons/icon-192x192.png';
import Articles from './components/Articles';
import Applications from './components/Applications';
import styles from './Center.less';
const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        课程{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
        </span>
      </span>
    ),
  },
  {
    key: 'applications',
    tab: (
      <span>
        赞过的文章{' '}
        <span
          style={{
            fontSize: 14,
          }}
        >
        </span>
      </span>
    ),
  },
];

const TagList = ({ tags }) => {
  const ref = useRef(null);
  const [newTags, setNewTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const showInput = () => {
    setInputVisible(true);

    if (ref.current) {
      // eslint-disable-next-line no-unused-expressions
      ref.current?.focus();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    let tempsTags = [...newTags];

    if (inputValue && tempsTags.filter((tag) => tag.label === inputValue).length === 0) {
      tempsTags = [
        ...tempsTags,
        {
          key: `new-${tempsTags.length}`,
          label: inputValue,
        },
      ];
    }

    setNewTags(tempsTags);
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div className={styles.tags}>
      <div className={styles.tagsTitle}>标签</div>
      {(tags || []).concat(newTags).map((item) => (
        <Tag key={item.key}>{item.label}</Tag>
      ))}
      {inputVisible && (
        <Input
          ref={ref}
          type="text"
          size="small"
          style={{
            width: 78,
          }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag
          onClick={showInput}
          style={{
            borderStyle: 'dashed',
          }}
        >
          <PlusOutlined />
        </Tag>
      )}
    </div>
  );
};

class AccountCenter extends Component {
  // static getDerivedStateFromProps(
  //   props: accountCenterProps,
  //   state: accountCenterState,
  // ) {
  //   const { match, location } = props;
  //   const { tabKey } = state;
  //   const path = match && match.path;
  //   const urlTabKey = location.pathname.replace(`${path}/`, '');
  //   if (urlTabKey && urlTabKey !== '/' && tabKey !== urlTabKey) {
  //     return {
  //       tabKey: urlTabKey,
  //     };
  //   }
  //   return null;
  // }
  state = {
    tabKey: 'articles',
  };
  input = undefined;

  componentDidMount() {
    const { dispatch, user} = this.props;
    dispatch({
      type: 'accountCenter/fetchCurrent',
    });

    if(user.memberID){
      dispatch({
        type: 'accountCenter/fetch',
        payload:user.memberID
      });
    }
    
  }


  onTabChange = (key) => {
    // If you need to sync state to url
    // const { match } = this.props;
    // router.push(`${match.url}/${key}`);
    this.setState({
      tabKey: key,
    });
  };
  renderChildrenByTabKey = (tabKey) => {

    if (tabKey === 'applications') {
      return <Applications />;
    }

    if (tabKey === 'articles') {
      return <Articles />;
    }

    return null;
  };
  renderUserInfo = (currentUser) => (
    <div className={styles.detail}>
      <p>
        <ContactsOutlined
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.name||currentUser.employeeName||currentUser.adminName}
      </p>
      {(currentUser.employeeNo||currentUser.adminNo)?<p>
        <ClusterOutlined
          style={{
            marginRight: 8,
          }}
        />
        工号：
        {currentUser.employeeNo||currentUser.adminNo}
      </p>:null}
      {currentUser.email?<p>
        <HomeOutlined
          style={{
            marginRight: 8,
          }}
        />
        {currentUser.email}
      </p>:null}
      {currentUser.school?<p>
        <BankOutlined style={{
            marginRight: 8,
          }} />
          学校:
        {currentUser.school}
      </p>:null}
      {currentUser.birthday?<p>
        <CalendarOutlined  style={{
            marginRight: 8,
          }} />
          生日:
        {new Date(currentUser.birthday).toLocaleDateString()}
      </p>:null}
      {currentUser.idNum?<p>
        <IdcardOutlined style={{
            marginRight: 8,
          }} />
          身份证:
        {currentUser.idNum}
      </p>:null}
    </div>
  );

  render() {
    const { tabKey } = this.state;
    const { currentUser = {}, currentUserLoading } = this.props;
    const dataLoading = currentUserLoading || !(currentUser && Object.keys(currentUser).length);
    return (
      <GridContent>
        <Row gutter={24}>
          <Col lg={7} md={24}>
            <Card
              bordered={false}
              style={{
                marginBottom: 24,
              }}
              loading={dataLoading}
            >
              {!dataLoading && (
                <div>
                  <div className={styles.avatarHolder}>
                    <img alt="" src={currentUser.avatar||logo} />
                    <div className={styles.name}>{currentUser.userName||currentUser.employeeName||currentUser.adminName}</div>
                    <div>{currentUser.userPhone||currentUser.employeePhone||currentUser.adminPhone}</div>
                  </div>
                  {this.renderUserInfo(currentUser)}
                  <Divider dashed />
                  <TagList tags={currentUser.tags || []} />
                  <Divider
                    style={{
                      marginTop: 16,
                    }}
                    dashed
                  />
                </div>
              )}
            </Card>
          </Col>
          {currentUser.memberID?
          <Col lg={17} md={24}>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              activeTabKey={tabKey}
              onTabChange={this.onTabChange}
            >
              {this.renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
          :null}
        </Row>
      </GridContent>
    );
  }
}

export default connect(({ loading, accountCenter,user }) => ({
  user:user.currentUser,
  currentUser: accountCenter.currentUser,
  currentUserLoading: loading.effects['accountCenter/fetchCurrent'],
}))(AccountCenter);
