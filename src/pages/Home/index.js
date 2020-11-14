import React from 'react';
import {
  Card,
  Row,
  Col,
  Rate,
  Skeleton,
  Modal,
  Avatar,
  Input,
  Carousel,
  Button,
  message,
} from 'antd';
import {
  FireTwoTone,
  ShoppingCartOutlined,
  EllipsisOutlined,
  UserOutlined,
  CodeTwoTone,
  NotificationTwoTone,
  DollarCircleTwoTone,
  VideoCameraTwoTone,
  InsuranceTwoTone,
} from '@ant-design/icons';
import styles from './index.less';
import { getLesson, getSection } from '../../services/lesson';
import SectionList from '@/components/SectionList';
import Pay from './component/pay';
import { connect } from 'umi';
import { createOrder } from '../../services/order';
const { Search } = Input;
const { Meta } = Card;
class Lesson extends React.Component {
  state = {
    sectionList: [],
    listLoading: true,
    isVisible: false,
  };
  fetchSections = () => {
    this.setState({
      listLoading: true,
    });
    getSection(this.props.data.lessonID)
      .then((res) => {
        this.setState({
          sectionList: res.data,
          listLoading: false,
        });
        this.detail();
      })
      .catch((err) => {
        message.error(`获取列表失败：${err}`);
        this.setState({
          listLoading: false,
        });
      });
  };
  detail = () => {
    const { data } = this.props;
    const { sectionList, listLoading } = this.state;
    Modal.info({
      width: 600,
      title: data.lessonName,
      content: (
        <>
          {data.Teacher ? (
            <div className={styles.teacher}>
              {data.Teacher.teacherImg ? (
                <Avatar size={64} style={{ flexShrink: 0 }} src={data.Teacher.teacherImg} />
              ) : (
                <Avatar size={64} style={{ flexShrink: 0 }} icon={<UserOutlined />} />
              )}
              <div className={styles.teacher_info}>
                <div>讲师：{data.Teacher?.teacherName}</div>
                {data.Teacher?.teacherIntro ? (
                  <div>讲师简介：{data.Teacher?.teacherIntro}</div>
                ) : null}
              </div>
            </div>
          ) : null}
          {data.lessonIntro ? <div>课程简介：{data.lessonIntro}</div> : null}
          {data.lessonPeriod ? <div>总学时：{data.lessonPeriod}</div> : null}
          {data.lessonScore === 0 ? (
            <div>暂无评分</div>
          ) : (
            <div>
              评分：
              <Rate disabled defaultValue={data.lessonScore} />
            </div>
          )}
          <SectionList sectionList={sectionList} listLoading={listLoading} from="Index" />
        </>
      ),
      onOk() {},
    });
  };
  buyLesson = () => {
    this.setState({
      isVisible: true,
    });
  };
  handleOk = () => {
    const { memberID } = this.props.currentUser;
    const { lessonID } = this.props.data;
    if (!memberID) {
      message.error('请使用会员账号登录购买');
    } else {
      let order = {
        memberID,
        lessonID,
        lessonOrdTime: new Date(),
      };
      createOrder(order).then((res) => {
        if (res.status == 'ok') message.success('购课成功，请在个人中心查看课程');
        else message.error('购课失败，请确认是否已购买过该课程');
      });
    }
    this.setState({
      isVisible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      isVisible: false,
    });
  };
  render() {
    const { data } = this.props;
    const { isVisible } = this.state;
    return (
      <Col sm={12} lg={6} xs={12}>
        <Card
          hoverable="true"
          cover={<img alt={data.lessonName} src={data.lessonImg} />}
          actions={[
            <ShoppingCartOutlined onClick={this.buyLesson} key="购课" />,
            <EllipsisOutlined onClick={this.fetchSections} key="详情" />,
          ]}
        >
          <Skeleton loading={data.loading} active round>
            <Meta
              avatar={data.lessonStuNum >= 1000 ? <FireTwoTone twoToneColor="#ff0000" /> : null}
              title={data.lessonName}
            />
          </Skeleton>
        </Card>
        <Pay
          isVisible={isVisible}
          handleCancel={this.handleCancel}
          handleOk={this.handleOk}
          cost={data.lessonCost}
        />
      </Col>
    );
  }
}
const LessonWrapper = connect(({ user }) => ({
  currentUser: user.currentUser,
}))(Lesson);
export default class Home extends React.Component {
  state = {
    data: [
      { loading: true },
      { loading: true },
      { loading: true },
      { loading: true },
      { loading: true },
      { loading: true },
      // mock-data
      // {
      //   lessonID: '000001',
      //   lessonName: '职业培训',
      //   teacherName: '哈哈哈',
      //   lessonImg:
      //     'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-yunzhi/e61712c0-060f-11eb-8bd0-2998ac5bbf7e.jpg',
      //   lessonScore: 9,
      //   lessonStuNum: 1500,
      // },
      // {
      //   lessonID: '000002',
      //   lessonName: '职业培训',
      //   teacherName: '哈哈哈',
      //   lessonImg:
      //     'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-yunzhi/e574b840-060f-11eb-b997-9918a5dda011.jpg',
      //   lessonScore: 9,
      //   lessonStuNum: 200,
      // },
      // {
      //   lessonID: '000003',
      //   lessonName: '职业培训',
      //   teacherName: '哈哈哈',
      //   lessonImg:
      //     'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-yunzhi/e49f8df0-060f-11eb-b997-9918a5dda011.jpg',
      //   lessonScore: 9,
      //   lessonStuNum: 20,
      // },
      // {
      //   lessonID: '000004',
      //   lessonName: '职业培训',
      //   teacherName: '哈哈哈',
      //   lessonImg:
      //     'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-yunzhi/e3c114d0-060f-11eb-8bd0-2998ac5bbf7e.jpg',
      //   lessonScore: 9,
      //   lessonStuNum: 3400,
      // },
    ],
    banner: [
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-yunzhi/e6c98620-19d4-11eb-b997-9918a5dda011.jpg',
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-yunzhi/106d0240-19d5-11eb-b997-9918a5dda011.jpg',
      'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-yunzhi/16caf3e0-19d5-11eb-8ff1-d5dcf8779628.jpg',
    ],
    category: [
      {
        icon: <CodeTwoTone twoToneColor="orange" style={{ fontSize: '30px' }} />,
        name: '计算机',
      },
      {
        icon: <NotificationTwoTone twoToneColor="orange" style={{ fontSize: '30px' }} />,
        name: '运营',
      },
      {
        icon: <DollarCircleTwoTone twoToneColor="orange" style={{ fontSize: '30px' }} />,
        name: '商业',
      },
      {
        icon: <VideoCameraTwoTone twoToneColor="orange" style={{ fontSize: '30px' }} />,
        name: '视频剪辑',
      },
      {
        icon: <InsuranceTwoTone twoToneColor="orange" style={{ fontSize: '30px' }} />,
        name: '法律',
      },
    ],
    loadMoreState: true,
  };
  componentDidMount() {
    getLesson({ limit: 12, offset: 0 })
      .then((data) => {
        if (data) {
          this.setState({
            data,
            loadMoreState: true,
          });
        } else {
          this.setState({
            loadMoreState: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  loadMore = () => {
    getLesson({ limit: 12, offset: this.state.data.length })
      .then((res) => {
        if (res.length != 0) {
          this.setState({
            data: this.state.data.concat(res),
            loadMoreState: true,
          });
        } else {
          this.setState({
            loadMoreState: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    const { data, banner, category, loadMoreState } = this.state;
    return (
      <>
        <Card>
          <Row justify="center" gutter={[16, 16]}>
            <Col span={14}>
              <Search placeholder="JAVA高级课程" style={{ borderRadius: '20px', height: '40px' }} />
            </Col>
            <Col span={24}>
              <Carousel autoplay>
                {banner.map((item) => {
                  return <img className={styles.banner_img} src={item} alt="CloudClass" />;
                })}
              </Carousel>
            </Col>
            <Col span={24} className={styles.category}>
              <span className={styles.category_name}>热门分类</span>
              <div className={styles.category_ctn}>
                {category.map((item) => {
                  return (
                    <div className={styles.category_wrap}>
                      <p className={styles.category_img} key={item.name}>
                        {item.icon}
                      </p>
                      <span>{item.name}</span>
                    </div>
                  );
                })}
              </div>
            </Col>
            <Col span={24}>
              <span className={styles.hot_class}>热门课程</span>
              <Row gutter={[16, 24]}>
                {data.length > 0
                  ? data.map((item) => {
                      return <LessonWrapper key={item.lessonID} data={item} />;
                    })
                  : null}
              </Row>
            </Col>
            <Col span={24} style={{ textAlign: 'center' }}>
              {data.length >= 12 && loadMoreState ? (
                <Button style={{ width: '350px' }} onClick={this.loadMore}>
                  加载更多
                </Button>
              ) : null}
            </Col>
          </Row>
        </Card>
      </>
    );
  }
}
