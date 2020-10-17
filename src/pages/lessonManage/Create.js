import React from 'react';
import { Steps, Button, message } from 'antd';
import CreateLesson from './Components/CreateLesson';
import CreateChapter from './Components/CreateChapter';
const { Step } = Steps;
export default class Create extends React.Component {
  state = {
    lessonID: 0,
    btnStatus: true,
    current: 0,
  };

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  changeBtnStatus = (bool) => {
    this.setState({
      btnStatus: bool,
    });
  };

  setCurrentLesson = (id) => {
    this.setState({
      lessonID: id,
    });
  };
  render() {
    const { current, btnStatus } = this.state;
    const steps = [
      {
        title: '课程概况',
        content: (
          <CreateLesson
            next={this.next}
            changeBtnStatus={this.changeBtnStatus}
            setCurrentLesson={this.setCurrentLesson}
          />
        ),
      },
      {
        title: '章节',
        content: <CreateChapter lessonID={this.state.lessonID} />,
      },
    ];
    return (
      <>
        <Steps current={current} size="small" style={{ width: '500px', margin: '30px auto' }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {steps.map((item, index) => (
          <div style={current === index ? { display: 'block' } : { display: 'none' }}>
            {item.content}
          </div>
        ))}
        <div>
          {current < steps.length - 1 && (
            <Button
              disabled={btnStatus}
              style={{ margin: '8px auto', float: 'right' }}
              onClick={() => this.next()}
            >
              下一步
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '8px auto', float: 'right' }} onClick={() => this.prev()}>
              上一步
            </Button>
          )}
        </div>
      </>
    );
  }
}
