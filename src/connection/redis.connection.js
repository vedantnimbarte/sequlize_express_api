const redis = require('redis');

const client = redis.createClient({
    port:  '127.0.0.1',
    host: 6379
})

client.on('connect', () => {
    console.log('Client connected to redis...')
})

client.on('ready', () => {
    console.log('Client connected to redis and ready to use...')
})

client.on('error', (err) => {
    console.log(err.message)
})

client.on('end', () => {
    console.log('Client disconnected from redis')
})

process.on('SIGINT', () => {
    client.expire()
})

module.exports = client ;