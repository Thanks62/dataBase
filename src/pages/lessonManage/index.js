import React from 'react';
import { Tabs, Card } from 'antd';
import { ProfileOutlined, FileAddOutlined } from '@ant-design/icons';
import LessonList from './LessonList';
import Create from './Create';
const { TabPane } = Tabs;
export default class LessonManage extends React.Component {
  render() {
    return (
      <Card>
        <Tabs>
          <TabPane
            tab={
              <span>
                <ProfileOutlined />
                课程列表
              </span>
            }
            key="1"
          >
            <LessonList />
          </TabPane>
          <TabPane
            tab={
              <span>
                <FileAddOutlined />
                新增课程
              </span>
            }
            key="2"
          >
            <Create />
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
