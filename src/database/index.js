const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}./../config/database.json`)[env];
const { applyForeignKeySetup } = require("./refreence");

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false
    }
  });
}

const modelDefiners = [
  require('./model/role.model'),
  require('./model/game-group.model'),
  require('./model/faq.model'),
  require('./model/setting.model'),
  require('./model/coin-pack.model'),
  require('./model/loyalty.model'),
  require('./model/agent-permission.model'),
  require('./model/menu.model'),
  require('./model/game.model'),
  require('./model/slider.model'),
  require('./model/menu-permission.model'),
  require('./model/agent.model'),
  require('./model/player.model'),
  require('./model/const.model'),
  require('./model/agent-transaction.model'),
  require('./model/player-transaction.model')
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

applyForeignKeySetup(sequelize);

sequelize.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = sequelize;