import request from '@/utils/request';
export async function getOrg(params) {
  return request('/api/org', {
    params,
  });
}
export async function editOrg(params) {
  return request('/api/org', {
    method: 'POST',
    data: params,
  });
}
