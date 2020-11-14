import { Modal, Radio } from 'antd';
import { AlipayCircleOutlined, WechatOutlined, CreditCardOutlined } from '@ant-design/icons';
import React from 'react';
export default function Pay(props) {
  const { isVisible, handleOk, handleCancel, cost } = props;
  const [payMethod, setPayMethod] = React.useState(1);
  return (
    <Modal title="确认购买" visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
      <p>请选择付款方式：</p>
      <Radio.Group
        value={payMethod}
        onChange={(e) => {
          setPayMethod(e.target.value);
        }}
      >
        <Radio value={1}>
          <AlipayCircleOutlined style={{ fontSize: '28px' }} />
        </Radio>
        <Radio value={2}>
          <WechatOutlined style={{ fontSize: '28px' }} />
        </Radio>
        <Radio value={3}>
          <CreditCardOutlined style={{ fontSize: '28px' }} />
        </Radio>
      </Radio.Group>
      <p>*购买前请确认信息无误</p>
      <p style={{ fontSize: '18px' }}>
        售价：<span style={{ color: 'red' }}>{cost}</span>
      </p>
    </Modal>
  );
}
