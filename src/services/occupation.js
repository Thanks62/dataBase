import request from '@/utils/request';
export async function createOccupation(params) {
  return request(`/api/createOccupation?occupationName=${params}`);
}
export async function getOccupation(params) {
  return request('/api/getOccupation');
}
export async function deleteOccupation(params) {
  return request(`/api/deleteOccupation?occupationNo=${params}`);
}
