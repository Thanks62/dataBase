import request from '@/utils/request';
export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function getAllMember() {
  return request('/api/allMember');
}
export async function getAllEmployee() {
  return request('/api/allEmployee');
}
export async function getAllAdmin() {
  return request('/api/allAdmin');
}
