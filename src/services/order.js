import request from '@/utils/request';
export async function createOrder(payload) {
  return request('/api/lessonOrder', {
    method: 'POST',
    data: payload,
  });
}
export async function getOrder() {
  return request('/api/lessonOrder');
}
