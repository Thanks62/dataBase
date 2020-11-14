import request from '@/utils/request';
export async function createLesson(params) {
  return request('/api/createLesson', {
    method: 'POST',
    data: params ? params : null,
  });
}
export async function getLesson(params) {
  console.warn(params);
  return request('/api/getLesson', {
    method: 'POST',
    params,
  });
}
export async function deleteLesson(params) {
  return request(`/api/deleteLesson?id=${params}`);
}
export async function createSection(params) {
  return request('/api/createSection', {
    method: 'POST',
    data: params ? params : null,
  });
}
export async function deleteSection(params) {
  return request(`/api/deleteSection?sectionID=${params}`);
}
export async function getSection(params) {
  return request(`/api/getSection?lessonID=${params}`);
}
export async function editLesson(params) {
  return request(`/api/editLesson`, {
    method: 'POST',
    data: params ? params : null,
  });
}
