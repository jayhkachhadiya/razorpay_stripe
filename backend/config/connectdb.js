const mongoose  = require("mongoose");

const connectdb = async (DATABASE_URL) => {
    try {
        const DB_NAME = {
            dbName: 'payment'
        }
        await mongoose.connect(DATABASE_URL,DB_NAME)
        console.log("connectd")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectdb
