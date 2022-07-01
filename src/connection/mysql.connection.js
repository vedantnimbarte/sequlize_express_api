const Sequelize = require('sequelize')

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_TYPE,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})


db.sync({ force: false })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  db
}
