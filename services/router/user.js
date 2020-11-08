const jwtMiddleware = require('../middleware/jwt');
const userController = require('../controller/userController');
module.exports = (app, sequelize) => {
  app.use('/api/currentUser', (req, res, next) => {
    jwtMiddleware.verify(req, res, next);
  });
  app.get('/api/currentUser', (req, res) => {
    // const user = {
    //   name: 'Serati Ma',
    //   avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    //   userid: '00000001',
    //   email: 'antdesign@alipay.com',
    //   signature: '海纳百川，有容乃大',
    //   title: '交互专家',
    //   group: '蚂蚁集团－某某某事业群－某某平台部－某某技术部－UED',
    //   tags: [
    //     {
    //       key: '0',
    //       label: '很有想法的',
    //     },
    //     {
    //       key: '1',
    //       label: '专注设计',
    //     },
    //     {
    //       key: '2',
    //       label: '辣~',
    //     },
    //     {
    //       key: '3',
    //       label: '大长腿',
    //     },
    //     {
    //       key: '4',
    //       label: '川妹子',
    //     },
    //     {
    //       key: '5',
    //       label: '海纳百川',
    //     },
    //   ],
    //   notifyCount: 12,
    //   unreadCount: 11,
    //   country: 'China',
    //   geographic: {
    //     province: {
    //       label: '浙江省',
    //       key: '330000',
    //     },
    //     city: {
    //       label: '杭州市',
    //       key: '330100',
    //     },
    //   },
    //   address: '西湖区工专路 77 号',
    //   phone: '0752-268888888',
    // };
    if (req.userType) {
      switch (req.userType) {
        case 'member':
          userController.getMember(sequelize, req.userID).then((member) => {
            res.send(member);
          });
          break;
        case 'employee':
          userController.getEmployee(sequelize, req.userID).then((employee) => {
            res.send(employee);
          });
          break;
        case 'admin':
          userController.getAdmin(sequelize, req.userID).then((admin) => {
            res.send(admin);
          });
          break;
      }
    } else {
      res.send(null);
    }
  });
};
