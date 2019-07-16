const dbHelpers = require('./mysqlHelpers');
const async = require('async');

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
}
