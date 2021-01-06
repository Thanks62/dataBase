// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  // locale: {
  //   // default zh-CN
  //   default: 'zh-CN',
  //   antd: true,
  //   // default true, when it is true, will use `navigator.language` overwrite default
  //   baseNavigator: true,
  // },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: 'register',
          path: '/user/register',
          component: './user/register',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              component: './Home',
              name: '首页',
              icon: 'smile',
              authority: ['user'],
            },
            {
              path: '/Emp',
              name: '机构管理',
              icon: 'appstore',
              authority: ['employee'],
              routes: [
                {
                  path: '/Emp/LessonManagement',
                  name: '课程管理',
                  component: './lessonManage',
                },
                {
                  path: '/Emp/TeacherManagement',
                  name: '讲师管理',
                  component: './teacherManage',
                },
                {
                  path: '/Emp/OrgManagement',
                  name: '机构信息',
                  component: './orgManage',
                },
              ],
            },
            {
              path: '/Sys',
              name: '平台管理',
              icon: 'appstore',
              authority: ['admin'],
              routes: [
                {
                  path: '/Sys/OrderManagement',
                  name: '订单管理',
                  component: './orderManagement',
                },
                {
                  path: '/Sys/MemberManagement',
                  name: '会员管理',
                  component: './memberManagement',
                },
                {
                  path: '/Sys/EmployeeManagement',
                  name: '职员管理',
                  component: './employeeManagement',
                },
                {
                  path: '/Sys/AdminManagement',
                  name: '管理员',
                  component: './adminManagement',
                },
                {
                  path: '/Sys/OrgManagement',
                  name: '机构管理',
                  component: './orgManagement',
                },
                {
                  path: '/Sys/SysData',
                  name: '平台数据',
                  component: './sysData',
                },
              ],
            },
            {
              name: '个人中心',
              icon: 'smile',
              path: '/accountcenter',
              authority: ['admin', 'user', 'employee'],
              component: './AccountCenter',
            },
            {
              name: '课程',
              path: '/lesson/:lessonID/:chapterID',
              component: './Lesson',
              hideInMenu: true,
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
});
