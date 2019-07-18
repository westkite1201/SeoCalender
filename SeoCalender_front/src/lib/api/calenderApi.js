import axios from 'axios';
import cilentConfig from '../../configuration/clientConfig'

//calender Insert
export const insertCalenderTodo = (data) =>{
    console.log(data)
   return (axios.post("http://localhost:3031/api/calender/insertCalenderTodo",data)) 
}

//get Calender 
export const getCalender  = (date) =>{
   let data = {
       date : date
   }
   return (axios.post("http://localhost:3031/api/calender/getCalender",data)) 
}

//get CalenderTodo 
export const getCalenderTodo  = (beforeDate, afterDate) =>{
   let data = {
        beforeDate : beforeDate,
        afterDate : afterDate
   }
   return (axios.post("http://localhost:3031/api/calender/getCalenderTodo", data)) 
}