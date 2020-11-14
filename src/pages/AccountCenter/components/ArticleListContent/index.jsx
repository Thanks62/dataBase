import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

const ArticleListContent = ({ data: { lessonOrdTime,Lesson } }) => (
  <div className={styles.listContent}>
    <div className={styles.extra}>
      <div className={styles.lessonInfo}>
        <img src={Lesson.lessonImg} style={{width:'80px'}} />
        <p style={{marginLeft:'10px'}}>{Lesson.lessonName}</p>
      </div>
      <div>
        <div style={{textAlign:'right'}}><span>实付款：</span><span  className={styles.description}>{Lesson.lessonCost}</span></div>
        <span> 下单时间:</span>
        <em>{moment(lessonOrdTime).format('YYYY-MM-DD HH:mm')}</em>
      </div>
    </div>
  </div>
);

export default ArticleListContent;
