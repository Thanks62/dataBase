import React from 'react';
import { Tabs, Card } from 'antd';
import { ProfileOutlined, FileAddOutlined } from '@ant-design/icons';
import TeacherList from './TeacherList';
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
                讲师列表
              </span>
            }
            key="1"
          >
            <TeacherList />
          </TabPane>
          <TabPane
            tab={
              <span>
                <FileAddOutlined />
                新增讲师
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
