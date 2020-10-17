import React from 'react';
import { Spin, List, Divider } from 'antd';
export default class SectionList extends React.Component {
  render() {
    const { sectionList, listLoading, from } = this.props;
    return (
      <>
        {sectionList.length !== 0 ? (
          <>
            <Divider>章节列表</Divider>
            <Spin spinning={listLoading}>
              <List
                size="small"
                bordered
                dataSource={sectionList}
                renderItem={(item, index) => (
                  <List.Item
                    title={<div>{item.sectionName}</div>}
                    actions={[
                      <>
                        {from != 'Index' ? (
                          <a
                            key="delete"
                            onClick={() => {
                              this.deleteSection(item.sectionID);
                            }}
                          >
                            删除
                          </a>
                        ) : null}
                      </>,
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <div>
                          第{index + 1}节：
                          {item.sectionName}
                        </div>
                      }
                      description={
                        <>
                          {from != 'Index' ? (
                            <>
                              <p>资源地址：{item.url}；</p>
                              <p>时长：{item.duration}</p>
                            </>
                          ) : null}
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Spin>
          </>
        ) : null}
      </>
    );
  }
}
