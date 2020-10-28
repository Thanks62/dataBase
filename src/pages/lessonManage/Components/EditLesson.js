import React from 'react';
import { Drawer, Button } from 'antd';
import EditForm from './CreateLesson';
import AddSection from './CreateChapter';
export default class EditLeson extends React.Component {
  state = {
    childrenDrawer: false,
  };
  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };
  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };
  render() {
    const { onClose, visible, data } = this.props;
    return (
      <Drawer
        title="编辑课程"
        width={780}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
          </div>
        }
      >
        <EditForm from="edit" data={data} />
        <Button
          style={{ marginTop: '20px' }}
          type="primary"
          ghost
          onClick={this.showChildrenDrawer}
        >
          章节编辑
        </Button>
        <Drawer
          title="编辑章节"
          width={350}
          closable={false}
          onClose={this.onChildrenDrawerClose}
          visible={this.state.childrenDrawer}
        >
          <AddSection from="edit" lessonID={data.lessonID} />
        </Drawer>
      </Drawer>
    );
  }
}
