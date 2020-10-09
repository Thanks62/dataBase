import request from '@/utils/request';
export async function getTeacher(params) {
  return request('/api/getTeacher', {
    method: 'POST',
  });
}
export async function createTeacher(params) {
  return request('/api/createTeacher', {
    method: 'POST',
    data: params,
  });
}
export async function deleteTeacher(params) {
  return request(`/api/deleteTeacher?id=${params}`);
}
