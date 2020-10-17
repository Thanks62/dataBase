import React from 'react';
import { Card, Row, Col, Rate, Skeleton, Modal, Avatar } from 'antd';
import {
  FireTwoTone,
  ShoppingCartOutlined,
  EllipsisOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styles from './index.less';
import { getLesson, getSection } from '../../services/lesson';
import SectionList from '@/components/SectionList';

const { Meta } = Card;
class Lesson extends React.Component {
  state = {
    sectionList: [],
    listLoading: true,
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
          <SectionList sectionList={sectionList} listLoading={listLoading} from="Index" />
        </>
      ),
      onOk() {},
    });
  };
  render() {
    const { data } = this.props;
    return (
      <Col sm={12} lg={6}>
        <Card
          hoverable="true"
          cover={<img alt={data.lessonName} src={data.lessonImg} />}
          actions={[
            <ShoppingCartOutlined key="购课" />,
            <EllipsisOutlined onClick={this.fetchSections} key="详情" />,
          ]}
        >
          <Skeleton loading={data.loading} active round>
            <Meta
              avatar={data.lessonStuNum >= 1000 ? <FireTwoTone twoToneColor="#ff0000" /> : null}
              title={data.lessonName}
              description={
                <>
                  {data.lessonIntro ? <div>课程简介：{data.lessonIntro}</div> : null}
                  {data.lessonScore === 0 ? (
                    <div>暂无评分</div>
                  ) : (
                    <div>
                      评分：
                      <Rate disabled defaultValue={data.lessonScore} />
                    </div>
                  )}
                </>
              }
            />
          </Skeleton>
        </Card>
      </Col>
    );
  }
}
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
  };
  componentDidMount() {
    getLesson()
      .then((data) => {
        this.setState({
          data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { data } = this.state;
    return (
      <Card>
        <Row gutter={[16, 24]}>
          {data.map
            ? data.map((item) => {
                return <Lesson key={item.lessonID} data={item} />;
              })
            : null}
        </Row>
      </Card>
    );
  }
}
