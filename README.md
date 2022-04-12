# README.md

## 简介

- ORM框架 - sequelize@v6
```bash
npm i sequelize
```
- 数据库迁移工具 - sequelize-cli
```js
npm i --save-dev sequelize-cli

// 创建一个 Model
npx sequelize-cli model:generate --name User --attributes name:string,email:string,age:integer,longInt:bigint,active:boolean,creditBalance:decimal,extra:json,activeAt:date,activeAt2:dateonly

npx sequelize-cli model:generate --name Post --attributes title:string,body:string
npx sequelize-cli model:generate --name Comment --attributes body:string,postId:integer

// 下面是 migration 相关使用：
//
// npx sequelize init # 初始化项目
// npx sequelize-cli db:create
// npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
// npx sequelize-cli db:migrate
// npx sequelize-cli db:migrate:undo
// npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
// npx sequelize-cli seed:generate --name demo-user
//   module.exports = {
//     up: (queryInterface, Sequelize) => {
//       return queryInterface.bulkInsert('Users', [{
//         firstName: 'John',
//         lastName: 'Doe',
//         email: 'example@example.com',
//         createdAt: new Date(),
//         updatedAt: new Date()
//       }]);
//     },
//     down: (queryInterface, Sequelize) => {
//       return queryInterface.bulkDelete('Users', null, {});
//     }
//   };
// npx sequelize-cli db:seed:all
// npx sequelize-cli db:seed:undo

// npx sequelize-cli migration:generate --name migration-skeleton
//   module.exports = {
//     up: (queryInterface, Sequelize) => {
//       return queryInterface.createTable('Person', {
//         name: Sequelize.DataTypes.STRING,
//         isBetaMember: {
//           type: Sequelize.DataTypes.BOOLEAN,
//           defaultValue: false,
//           allowNull: false
//         }
//       });
//     },
//     down: (queryInterface, Sequelize) => {
//       return queryInterface.dropTable('Person');
//     }
//   };

// The .sequelizerc file
// env: The environment to run the command in
// config: The path to the config file
// options-path: The path to a JSON file with additional options
// migrations-path: The path to the migrations folder
// seeders-path: The path to the seeders folder
// models-path: The path to the models folder
// url: The database connection string to use. Alternative to using --config files
// debug: When available show various debug information
//   // .sequelizerc
//   const path = require('path');

//   module.exports = {
//     'config': path.resolve('config', 'database.json'),
//     'models-path': path.resolve('db', 'models'),
//     'seeders-path': path.resolve('db', 'seeders'),
//     'migrations-path': path.resolve('db', 'migrations')
//   };

// npx sequelize-cli db:migrate --url 'mysql://root:password@mysql_host.com/database_name'

// 数据类型：
// DataTypes.STRING             // VARCHAR(255)
// DataTypes.STRING(1234)       // VARCHAR(1234)
// DataTypes.STRING.BINARY      // VARCHAR BINARY
// DataTypes.TEXT               // TEXT
// DataTypes.TEXT('tiny')       // TINYTEXT
// DataTypes.CITEXT             // CITEXT          PostgreSQL and SQLite only.
// DataTypes.TSVECTOR           // TSVECTOR        PostgreSQL only.
// DataTypes.BOOLEAN            // TINYINT(1)
// DataTypes.INTEGER            // INTEGER
// DataTypes.BIGINT             // BIGINT
// DataTypes.BIGINT(11)         // BIGINT(11)
// DataTypes.FLOAT              // FLOAT
// DataTypes.FLOAT(11)          // FLOAT(11)
// DataTypes.FLOAT(11, 10)      // FLOAT(11,10)
// DataTypes.REAL               // REAL            PostgreSQL only.
// DataTypes.REAL(11)           // REAL(11)        PostgreSQL only.
// DataTypes.REAL(11, 12)       // REAL(11,12)     PostgreSQL only.
// DataTypes.DOUBLE             // DOUBLE
// DataTypes.DOUBLE(11)         // DOUBLE(11)
// DataTypes.DOUBLE(11, 10)     // DOUBLE(11,10)
// DataTypes.DECIMAL            // DECIMAL
// DataTypes.DECIMAL(10, 2)     // DECIMAL(10,2)
// DataTypes.DATE       // DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
// DataTypes.DATE(6)    // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
// DataTypes.DATEONLY   // DATE without time
// DataTypes.UUID
// 特殊的类型：https://sequelize.org/master/manual/other-data-types.html
// API 文档：https://sequelize.org/api/v6/identifiers.html
// Model Options: https://sequelize.org/api/v6/class/src/model.js~model
// GUIDE 文档：
```

- 数据库驱动 - (mysql2/mariadb/sqlite3/pg,pg-hstore/tedious)
```bash
npm i mysql2
```



