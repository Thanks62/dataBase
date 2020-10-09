import request from '@/utils/request';
export async function createLesson(params) {
  return request('/api/createLesson', {
    method: 'POST',
    data: params ? params : null,
  });
}
export async function getLesson(params) {
  return request('/api/getLesson', {
    method: 'POST',
  });
}
export async function deleteLesson(params) {
  return request(`/api/deleteLesson?id=${params}`);
}
