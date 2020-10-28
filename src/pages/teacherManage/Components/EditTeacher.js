import React from 'react';
import { Drawer, Button } from 'antd';
import EditForm from '../Create';
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
        title="编辑讲师"
        width={480}
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
      </Drawer>
    );
  }
}
