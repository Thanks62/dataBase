import React from 'react';
import styles from './index.less';
import { Card } from 'antd';
import { getLesson, getSection } from '../../services/lesson';
import { Link } from 'umi';

export default class Lesson extends React.Component {
  state = {
    lesson: {},
    chapters: [],
    lessonID: null,
    currentChapter: {},
  };
  componentDidMount() {
    const lessonID = this.props.match.params.lessonID;
    const chapterID = this.props.match.params.chapterID;
    this.setState({
      lessonID,
    });
    getLesson({ lessonID: lessonID }).then((res) => {
      this.setState({
        lesson: res[0],
      });
    });
    getSection({ lessonID: lessonID }).then((res) => {
      let currentChapter;
      if (chapterID != 0) {
        currentChapter = res.data.filter((chapter) => {
          return chapter.sectionID == chapterID;
        })[0];
      } else {
        currentChapter = res.data[0] || null;
      }
      this.setState({
        chapters: res.data || [],
        currentChapter,
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.chapterID != this.props.match.params.chapterID) {
      let currentChapter = this.state.chapters.filter((chapter) => {
        return chapter.sectionID == nextProps.match.params.chapterID;
      })[0];
      this.setState({
        currentChapter,
      });
    }
  }
  render() {
    const { lesson, chapters, lessonID, currentChapter } = this.state;
    return (
      <>
        <Card>
          <div className={styles.header}>
            <div>
              {lesson.lessonName}
              {currentChapter ? <span>- {currentChapter.sectionName}</span> : null}
            </div>
            <div className={styles.info}>讲师：{lesson.Teacher?.teacherName}</div>
            {lesson.lessonIntro ? (
              <div className={styles.info}>简介：{lesson.lessonIntro}</div>
            ) : null}
          </div>
          <div className={styles.mainCtn}>
            <div className={styles.video}>
              {currentChapter ? (
                <video src={currentChapter.url} controls="controls" />
              ) : (
                <div>当前课程暂未开放本章节课程</div>
              )}
            </div>
            <div className={styles.chapter}>
              <strong>章节列表</strong>
              <ul>
                {chapters.length != 0 ? (
                  chapters.map((chapter, index) => {
                    return (
                      <div key={chapter.sectionID}>
                        <Link to={`/lesson/${lessonID}/${chapter.sectionID}`}>
                          <li>
                            第{index + 1}章：{chapter.sectionName}
                          </li>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ textAlign: 'center' }}>暂无章节</div>
                )}
              </ul>
            </div>
          </div>
        </Card>
      </>
    );
  }
}
