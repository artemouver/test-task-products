// Конфиг не используется, нужен только для WebStorm, чтобы правильно работал с псевдонимами
const path = require('path')

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname),
        },
    },
}
