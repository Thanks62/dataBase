import request from '@/utils/request';
export async function UserLogin(params) {
  return request('/api/login/userAccount', {
    method: 'POST',
    data: params,
  });
}
export async function EmployeeLogin(params) {
  return request('/api/login/employeeAccount', {
    method: 'POST',
    data: params,
  });
}
export async function AdminLogin(params) {
  return request('/api/login/adminAccount', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
export async function Logout() {
  return request('/api/logout');
}
export async function registerUser(payload) {
  console.log(payload);
  return request('/api/register/member', {
    method: 'POST',
    data: payload,
  });
}
