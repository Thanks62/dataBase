import request from 'umi-request';

export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryOrderList(params) {
  return request(`/api/lessonOrder?memberID=${params}`);
}
