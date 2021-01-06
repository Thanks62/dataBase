import React from 'react';
import { getAllMember } from '../../services/user';
import { getOrg } from '../../services/org';
import { getOrder } from '../../services/order';
import NumberInfo from 'ant-design-pro/lib/NumberInfo';
import { Row, Col, Card } from 'antd';
import { ChartCard, MiniArea, Pie, Bar } from 'ant-design-pro/lib/Charts';
import numeral from 'numeral';
import styles from './index.less';
export default class SysData extends React.Component {
  state = {
    data: [],
    total: 0,
    change: 0,
    org: [],
    order: [],
    orderChange: 0,
    orderNum: 0,
  };
  componentDidMount() {
    // 获取会员
    getAllMember().then((res) => {
      if (res.status === 'ok') {
        let data = [];
        // 统计
        let count = {};
        res.data?.map((item) => {
          count[new Date(item.createdAt).toLocaleDateString()] = count[
            new Date(item.createdAt).toLocaleDateString()
          ]
            ? count[new Date(item.createdAt).toLocaleDateString()] + 1
            : 1;
        });
        Object.keys(count).map((item) => {
          let obj = {};
          obj.x = item;
          obj.y = count[item];
          data.push(obj);
        });
        data.sort((a, b) => {
          return new Date(a.x) - new Date(b.x);
        });
        this.setState({
          data,
          total: res.data.length,
          change: data[data.length - 1].y - data[data.length - 2].y,
        });
      }
    });

    // 获取机构
    getOrg().then((res) => {
      if (res.status == 'ok') {
        let org = [];
        // 统计
        let count = {};
        res.data?.map((item) => {
          count[item.business] = count[item.business] ? count[item.business] + 1 : 1;
        });
        Object.keys(count).map((item) => {
          let obj = {};
          obj.x = item;
          obj.y = count[item];
          org.push(obj);
        });
        this.setState({
          org,
        });
      }
    });

    // 获取订单
    getOrder().then((res) => {
      if (res.status == 'ok') {
        let order = [];
        // 统计
        let count = {};
        res.data?.map((item) => {
          count[new Date(item.lessonOrdTime).toLocaleDateString()] = count[
            new Date(item.lessonOrdTime).toLocaleDateString()
          ]
            ? count[new Date(item.lessonOrdTime).toLocaleDateString()] + 1
            : 1;
        });
        Object.keys(count).map((item) => {
          let obj = {};
          obj.x = item;
          obj.y = count[item];
          order.push(obj);
        });
        this.setState({
          order,
          orderNum: res.data.length,
          orderChange: order[order.length - 1].y - order[order.length - 2].y,
        });
      }
    });
  }
  render() {
    const { total, data, change, org, order, orderChange, orderNum } = this.state;
    return (
      <>
        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Card>
              <ChartCard
                className={styles.number}
                title="平台会员总数"
                total={numeral(total).format('0,0')}
                contentHeight={180}
              >
                {data.length ? (
                  <>
                    <NumberInfo
                      className={styles.number}
                      subTitle={<span>每日新增</span>}
                      status="up"
                      subTotal={change}
                    />
                    <Bar height={145} data={data} />
                  </>
                ) : null}
              </ChartCard>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <ChartCard
                className={styles.number}
                title="平台订单量"
                total={numeral(orderNum).format('0,0')}
                contentHeight={180}
              >
                {order.length ? (
                  <>
                    <NumberInfo
                      className={styles.number}
                      subTitle={<span>每日新增</span>}
                      status="up"
                      subTotal={orderChange}
                    />
                    <MiniArea line height={100} data={order} />
                  </>
                ) : null}
              </ChartCard>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Card>
              <Pie
                hasLegend
                title="平台机构"
                subTitle="平台机构"
                valueFormat={(val) => (
                  <span dangerouslySetInnerHTML={{ __html: ' ' + val + '家' }} />
                )}
                data={org}
                height={294}
              />
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
