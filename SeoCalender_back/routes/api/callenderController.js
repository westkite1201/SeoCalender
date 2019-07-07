var express = require('express');
var router = express.Router();
let {PythonShell } = require('python-shell') 
const weatherDao = require('../../model/mysql/weatherDao')
const calenderDaoTest = require('../../model/mysql/calenderDaoTest')
const async = require('async');
const CallSeverApi = require('./CallSeverApi')('weather');
const moment = require('moment')

let newtime = 0;
let newdate = 0;




getWeatherData = async(res, nx, ny) => {
      //nx, ny는 디비에서 가져오기 
      //base_date오늘 날짜 
      //이 정보는 디비에서 글고 여기 함수에서 계산되는거임 
      let base_date, base_time, type;
      base_date = newdate
      base_time = newtime

      type = 'json'
        await CallSeverApi.weather(base_date, base_time, nx, ny, type, ( err, result ) => {
        if (!err) {
          console.log('in getWeatherData' , result)
          //return result
          res.json(result);
        } else {
          console.log(err);
        }
      })

}


/* 디비 조회하기  */
router.post('/dbtest',  async(req, res) => {
  try{
    let rows = await calenderDaoTest.dbTest();
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




router.post('/getLocation',  async(req, res) => {
  console.log("getLocation!!"  )
  const data = {
    LOCATION_A :  req.body.LOCATION_A,
    LOCATION_B :  req.body.LOCATION_B,
    LOCATION_C :  req.body.LOCATION_C,
} 
  try {
    async.waterfall(
      [
        (cb) => {
          weatherDao.connect(cb);
        },
        (conn, cb) => {
          weatherDao.getLocation(conn, data, cb);
        }
      ],
      (error, conn, result) => {
        if( conn ){
          weatherDao.release(conn);
        }
        if( error ){
          return res.json({
            error: error
          });
        }
        else{
          return res.json(result);
        }
      }
    )
  }
  catch (error) {
    console.error(error);
    return res.json({
      message: 'fail',
      code: 200,
      error: error
    });
  }
})

module.exports = router;
