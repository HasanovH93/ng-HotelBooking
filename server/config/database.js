const mongoose = require('mongoose');

const CONNECTION_STRING = 'mongodb://localhost:27017/hotel-booking';
module.exports = async(app) => {

    try{
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("DB Connected!");

        mongoose.connection.on('error', (err) => {
         console.error(`DB Error:  ${err.message}` );
         console.error(err)
        })
    } catch(err) {
        console.error(`${err.message}: Error with Connection to database`);
        process.exit(1)
    }
}