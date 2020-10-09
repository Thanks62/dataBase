import React from 'react';
import { Steps, Button, message } from 'antd';
import CreateLesson from './Components/CreateLesson';
const { Step } = Steps;
export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps: [
        {
          title: '课程概况',
          content: <CreateLesson next={this.next} />,
        },
        {
          title: '章节',
          content: 'Second-content',
        },
      ],
    };
  }

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };
  render() {
    const { current, steps } = this.state;
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
            <Button style={{ margin: '8px auto', float: 'right' }} onClick={() => this.next()}>
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
