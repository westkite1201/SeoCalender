//  *  Content Data Access Object
//  */
const dbHelpers = require('./mysqlHelpers');
const async = require('async');

/* 이름 한국어가져오기   */
const getLocation = async(conn, parameter, cb) => {
  const locationA = parameter.LOCATION_A;
  const locationB = parameter.LOCATION_B;
  const locationC = parameter.LOCATION_C;
  conn.query(
    `
    SELECT X,Y 
    FROM KOREA_LOCATION
    WHERE LOCATION_A = ? 
        AND LOCATION_B = ? 
        AND LOCATION_C = ?
    
    `,
    [
        locationA,
        locationB,
        locationC
    ],
    (error, result) => {
      if (error) {
        return cb(error, conn);
      }
      else {
        return cb(null, conn, result);
      }
    }
  )
}


const setDateCalender = async(conn, parameter, cb) => {
    const locationA = parameter.date;
    const locationB = parameter.;
    const locationC = parameter.LOCATION_C;
    conn.query(
      `
      INSERT INTO calender(date)
      VALUES('2019-07-08');
      `,
      [
          locationA,
          locationB,
          locationC
      ],
      (error, result) => {
        if (error) {
          return cb(error, conn);
        }
        else {
          return cb(null, conn, result);
        }
      }
    )
  }
  


module.exports = {
  connect: dbHelpers.doConnect,
  release: dbHelpers.doRelease,
  getLocation : getLocation,
}
