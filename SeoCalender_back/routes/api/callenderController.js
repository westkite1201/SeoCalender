var express = require('express');
var router = express.Router();
const calenderDaoNew = require('../../model/mysql/calenderDaoNew')
const async = require('async');
const moment = require('moment')

let newtime = 0;
let newdate = 0;

function statusCodeErrorHandler(statusCode, callback , data) {
  switch (statusCode) {
      case 200:
          callback(null, JSON.parse(data));
          break;
      default:
          callback('error', JSON.parse(data));
          break;
  }
}
/* 디비 조회하기  */
router.post('/insertCalenderTodo',  async(req, res) => {
  let data ={
    DATE :  req.body.date,
    TITLE :  req.body.title,
    DESC :  req.body.desc,
    COLOR :  req.body.background,
  }
  try{
    let rows = await calenderDaoNew.insertCalenderTodo(data);
    if(rows){
        console.log(rows)
        return res.json(rows)
    }else{
      console.log('error')
    }
  }catch(e){
    console.log('error' ,e)
  }
})


router.post('/getCalender',  async(req, res) => {
  let data ={
    DATE :  req.body.date,
  }
  try{
    let rows = await calenderDaoNew.getCalender(data);
    console.log('rows', rows)
    if(rows){
        console.log(rows)
        return res.json(rows)
    }else{
      console.log('error')
    }
  }catch(e){
    console.log('error' ,e)
  }
})

router.post('/getCalenderTodo',  async(req, res) => {
  
  let data ={
    BEFORE_DATE :  req.body.beforeDate,
    AFTER_DATE :  req.body.afterDate,
  }
  try{
    let rows = await calenderDaoNew.getCalenderTodo(data);
    console.log('rows', rows)
    if(rows){
        console.log(rows)
        return res.json(rows)
    }else{
      console.log('error')
    }
  }catch(e){
    console.log('error' ,e)
  }
})

// router.post('/getLocation',  async(req, res) => {
//   console.log("getLocation!!"  )
//   const data = {
//     LOCATION_A :  req.body.LOCATION_A,
//     LOCATION_B :  req.body.LOCATION_B,
//     LOCATION_C :  req.body.LOCATION_C,
// } 
//   try {
//     async.waterfall(
//       [
//         (cb) => {
//           weatherDao.connect(cb);
//         },
//         (conn, cb) => {
//           weatherDao.getLocation(conn, data, cb);
//         }
//       ],
//       (error, conn, result) => {
//         if( conn ){
//           weatherDao.release(conn);
//         }
//         if( error ){
//           return res.json({
//             error: error
//           });
//         }
//         else{
//           return res.json(result);
//         }
//       }
//     )
//   }
//   catch (error) {
//     console.error(error);
//     return res.json({
//       message: 'fail',
//       code: 200,
//       error: error
//     });
//   }
// })

module.exports = router;
