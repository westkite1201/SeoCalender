import { observable, action, computed } from 'mobx';
import moment from 'moment';
import _ from 'lodash';
import * as calenderApi from '../lib/api/calenderApi'
export default class PopupStore{
    @observable color = ''
    @observable title = ''
    @observable background = 'red'
    @observable showTodoModal = false;
    @observable selectPopupDate = '';
    @observable showColorPicker = false;

    @observable calenderTodoObject  ={ 
        date : '',
        title : '',
        desciption: '',
        background : '', 
    }





    @action
    toggleCalenderTodoModal = (nowDate) => {
        this.selectPopupDate = nowDate;
        this.calenderTodoObject.date = nowDate;
        console.log("toggleCalenderTodoModal")
        this.showTodoModal = !this.showTodoModal
    }
    @action 
    setBackgroundColor = (color) => { 
        this.calenderTodoObject.background = color.hex
    }

    @action
    onChangeTitle = (e) => {
        this.calenderTodoObject.title = e.target.value
    }
    @action
    onChangeDescription = (e) => {
        console.log(e.target.value)
        this.calenderTodoObject.desciption = e.target.value
    }
    @action
    toggleColorPicker = () => {
        this.showColorPicker = !this.showColorPicker
    }

    /* 캘린더 추가  */
    @action
    concatCalendar = async(date) => {
        console.log("concatCalendar" , date);
        try{ 
            const response = await calenderApi.insertCalenderTodo( this.calenderObject )
            if(response.status == 200){
                const getCalenderResponse = await calenderApi.getCalender( date );
                console.log(getCalenderResponse)

            }
        }catch(e){
            console.log(e)
        }
        
        let formatDate = moment(date).format('YYYY-MM-DD')
        let calenderObjListClone = _.isNil(this.calenderObjectMap.get(formatDate) ) ? [] : this.calenderObjectMap.get(date) 
        calenderObjListClone.push(this.calenderObject);
        this.calenderObjectMap.set(formatDate, calenderObjListClone);

        this.calenderObject = {
            date : '',
            background : this.background,
            title : '',
            description : ''
        } //초기화
    }
 
}