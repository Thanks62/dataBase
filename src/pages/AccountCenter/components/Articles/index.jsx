import React from 'react';
import { PlayCircleTwoTone, MessageFilled } from '@ant-design/icons';
import { List, Tag,Modal,Rate } from 'antd';
import { connect,Link } from 'umi';
import ArticleListContent from '../ArticleListContent';
import styles from './index.less';
const desc = ['体验不佳', '体验一般', '普通', '好', '非常好'];
const RateModel=(props)=>{
  const [rate,setRate]=React.useState(0);
  const {handleOk,handleCancle,visible,rateProp} = props;
  return(
    <Modal title="评分" visible={visible} onOk={()=>{handleOk(rate)}} onCancel={handleCancle}>
      <Rate tooltips={desc} onChange={(value)=>{setRate(value)}} value={rate} />
      {rate ? <span className="ant-rate-text">{desc[rate - 1]}</span> : ''}
      <p style={{color:'gray',fontSize:'13px',marginTop: '20px'}}>*评分只可操作一次</p>
    </Modal>
  )
}
const Articles = (props) => {
  const { list } = props;
  const [visible,setVisible] = React.useState(false);

  const IconText = ({ icon, text }) => (
    <span style={{cursor:'pointer'}}>
      {icon} {text}
    </span>
  );

  function handleCancle(){
    setVisible(false);
  }

  function handleOk(rate){
    setVisible(false);
  }

  return (
    <List
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          key={item.lessonOrderNo}
          actions={[
            <Link to={`/lesson/${item.Lesson?.lessonID}/0`}><IconText key="star" icon={<PlayCircleTwoTone />} text="观看" /></Link>,
            <div onClick={()=>{setVisible(true)}}><IconText key="message" icon={<MessageFilled />} text="评价" /></div>,
            <IconText key="status" text={item.lessonOrdStatus} />,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={item.href}>
                {item.title}
              </a>
            }
            description={
              <span>
                <Tag>{item.Lesson?.Organization?.orgName}</Tag>
              </span>
            }
          />
          <ArticleListContent data={item} />
          <RateModel visible={visible} handleCancle={handleCancle} handleOk={handleOk} rateProp={item.lessonOrderScore} />
        </List.Item>
      )}
    />
  );
};

export default connect(({ accountCenter }) => ({
  list: accountCenter.list,
}))(Articles);
