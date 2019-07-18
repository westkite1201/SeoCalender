
const dbHelpers = require('./mysqlHelpersPromise');
const moment =require('moment')

/*  */
const insertCalenderTodo = async (parameter) => {
	try {
		const connection = await dbHelpers.pool.getConnection(async conn => conn);
		try {
			/* Step 3. */
			const DATE = moment(parameter.DATE).format('YYYY-MM-DD')
			const TITLE = parameter.TITLE
			const DESC = parameter.DESC
			const COLOR = parameter.COLOR

			let sql = `
				INSERT INTO calender ( date )
				SELECT ?
				FROM dual
				WHERE NOT EXISTS (
					SELECT *  
					FROM calender
					WHERE date =  ?
				)`
			await connection.beginTransaction(); // START TRANSACTION
			await connection.query(sql, [DATE,DATE]);
			await connection.query(`INSERT INTO calender_todo(date, title, description, color) VALUES(?, ?, ?, ?)`, [DATE, TITLE, DESC, COLOR]);
			await connection.commit(); // COMMIT
			connection.release();
            return [ { statusCode : 200 }];
            
		} catch(err) {
			await connection.rollback(); // ROLLBACK
			connection.release();
			console.log('Query Error', err);
			return false;
        }
        
	} catch(err) {
		console.log('DB Error', err);
		return false;
	}
};
/* 현재 선택한 달, +- 1 한 전체 todo 가져오기  */
const getCalenderTodo = async (parameter) => {
	try {
		const connection = await dbHelpers.pool.getConnection(async conn => conn);
		try {
		
			const BEFORE_DATE = parameter.BEFORE_DATE
			const AFTER_DATE = parameter.AFTER_DATE

			let sql = `
				select * 
				from calender_todo 
				where ? <= date <= ?
			`
			//await connection.beginTransaction(); // START TRANSACTION
			const [rows] = await connection.query(sql, [BEFORE_DATE, AFTER_DATE]);
			await connection.commit(); // COMMIT
			connection.release();
            return {
					data : rows, 
					statusCode : 200 
				};
            
		} catch(err) {
			await connection.rollback(); // ROLLBACK
			connection.release();
			console.log('Query Error', err);
			return false;
        }
        
	} catch(err) {
		console.log('DB Error', err);
		return false;
	}
};


const getCalender = async (parameter) => {
	try {
		const connection = await dbHelpers.pool.getConnection(async conn => conn);
		try {
			/* Step 3. */
			const DATE = moment(parameter.DATE).format('YYYY-MM-DD')

			let sql = `
				SELECT *
				FROM calender_todo
				WHERE date = ?
			`
			//await connection.beginTransaction(); // START TRANSACTION
			const [rows] = await connection.query(sql, [DATE]);
			await connection.commit(); // COMMIT
			connection.release();
            return {
					data : rows , 
					statusCode : 200 
				};
            
		} catch(err) {
			await connection.rollback(); // ROLLBACK
			connection.release();
			console.log('Query Error', err);
			return false;
        }
        
	} catch(err) {
		console.log('DB Error', err);
		return false;
	}
};









module.exports = {
	insertCalenderTodo : insertCalenderTodo,
	getCalender : getCalender,
	getCalenderTodo: getCalenderTodo,
  }