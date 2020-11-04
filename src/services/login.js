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
