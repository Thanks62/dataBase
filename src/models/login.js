import { stringify } from 'querystring';
import { history } from 'umi';
import { UserLogin, EmployeeLogin, AdminLogin, Logout } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
// 存储token
function setToken(token) {
  window.localStorage.setItem('token', token);
}
function cleanToken() {
  if (window.localStorage.getItem('token')) window.localStorage.removeItem('token');
}
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *loginUser({ payload }, { call, put }) {
      const response = yield call(UserLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.status === 'ok') {
        history.replace('/');
      }
    },

    *loginEmployer({ payload }, { call, put }) {
      const response = yield call(EmployeeLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.status === 'ok') {
        history.replace('/Emp/LessonManagement');
      }
    },

    *loginAdmin({ payload }, { call, put }) {
      const response = yield call(AdminLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.status === 'ok') {
        history.replace('/Sys/sysData');
      }
    },

    *logout({ payload }, { call, put }) {
      const response = yield call(Logout);
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      if (response.status == 'ok') {
        if (window.location.pathname !== '/user/login' && !redirect) {
          history.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          });
        }
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
