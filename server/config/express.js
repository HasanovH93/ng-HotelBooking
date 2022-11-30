const express = require('express');
 const cors = require('cors')
 require('dotenv').config()
// const cors = require('../middlewares/cors');
const session = require('../middlewares/session');
const trimBody = require('../middlewares/trimBody');
const { expressjwt: expressJwt } = require('express-jwt');

module.exports = (app) => {

    app.use("*", cors());
    app.use(express.json());
    app.use(trimBody());
    app.use(session())
    // app.use(
    //     expressJwt({
    //       secret: "ljgfgjkhdghd123",
    //       algorithms: ["HS256"],
    //     }).unless({
    //        path:  [
    //       { url : `/users/login`}
         
    //       ]
    //     })
    //   );
    // app.use(session());
}