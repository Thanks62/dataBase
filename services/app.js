const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/index');
const cookieParser = require('cookie-parser');
const occupationController = require('./controller/occupationController');
app = new express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// 连接数据库
async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}
// 监听端口
async function init() {
  await assertDatabaseConnectionOk();
  app.listen(3000, () => {
    console.log('listen at 3000');
  });
}

init();
const modules = [
  require('./router/lesson'),
  require('./router/login'),
  require('./router/user'),
  require('./router/order'),
];
for (let module of modules) {
  module(app, sequelize);
}
app.get('/api/createOccupation', (req, res) => {
  occupationController
    .createOccupation(sequelize, req.query)
    .then(() => {
      res.status(200).send({
        status: 200,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.get('/api/getOccupation', (req, res) => {
  occupationController
    .getOccupation(sequelize)
    .then((data) => {
      res.status(200).send({
        data,
        status: 200,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
app.get('/api/deleteOccupation', (req, res) => {
  occupationController
    .deleteOccupation(sequelize, req.query)
    .then(() => {
      res.status(200).send({ status: 200 });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
function getFakeCaptcha(req, res) {
  return res.json('captcha-xxx');
} // 代码中会兼容本地 service mock 以及部署站点的静态数据

app.get('/api/users', (req, res) => {
  const users = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  res.send(users);
});
// app.post('/api/login/account', (req, res) => {
//   const { password, userName, type } = req.body;
//   if (password === 'ant.design' && userName === 'admin') {
//     res.send({
//       status: 'ok',
//       type,
//       currentAuthority: 'admin',
//     });
//     return;
//   }

//   if (password === 'ant.design' && userName === 'user') {
//     res.send({
//       status: 'ok',
//       type,
//       currentAuthority: 'user',
//     });
//     return;
//   }

//   if (type === 'mobile') {
//     res.send({
//       status: 'ok',
//       type,
//       currentAuthority: 'admin',
//     });
//     return;
//   }

//   res.send({
//     status: 'error',
//     type,
//     currentAuthority: 'guest',
//   });
// });
app.post('/api/register', (req, res) => {
  res.send({
    status: 'ok',
    currentAuthority: 'user',
  });
});
app.get('/api/500', (req, res) => {
  res.status(500).send({
    timestamp: 1513932555104,
    status: 500,
    error: 'error',
    message: 'error',
    path: '/base/category/list',
  });
});
app.get('/api/404', (req, res) => {
  res.status(404).send({
    timestamp: 1513932643431,
    status: 404,
    error: 'Not Found',
    message: 'No message available',
    path: '/base/category/list/2121212',
  });
});
app.get('/api/403', (req, res) => {
  res.status(403).send({
    timestamp: 1513932555104,
    status: 403,
    error: 'Unauthorized',
    message: 'Unauthorized',
    path: '/base/category/list',
  });
});
app.get('/api/401', (req, res) => {
  res.status(401).send({
    timestamp: 1513932555104,
    status: 401,
    error: 'Unauthorized',
    message: 'Unauthorized',
    path: '/base/category/list',
  });
});
app.get('/api/login/captcha', (req, res) => {
  getFakeCaptcha();
});
