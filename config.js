const dotenv = require('dotenv');
dotenv.config();
// console.log(process.env.MONGO_URI)

module.exports = {
    mongoUri: process.env.MONGO_URI,
    PORT: process.env.PORT || 3001,
}