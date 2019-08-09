import { observable, action, computed } from 'mobx';
import moment from 'moment';
import _ from 'lodash';
import * as calenderApi from '../lib/api/calenderApi'
import { toast } from "react-toastify";

export default class PopupStore{
    /* calender 스토어에 접근하기 위함  */
    constructor(rootStore) {
        this.rootStore = rootStore
    }
    
    @observable color = ''
    @observable title = ''
    @observable background = '#FCCB00'
    @observable showTodoModal = false;
    @observable selectPopupDate = '';
    @observable showColorPicker = false;

    @observable calenderTodoObject  ={ 
        date : '',
        title : '',
        description: '',
        background  : '#FCCB00', 
    }

    @action
    initCalenderObeject = () =>{
        this.calenderTodoObject  ={ 
            date : '',
            title : '',
            description: '',
            background  : '#FCCB00', 
        }
    
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
        let background =  color.hex
        this.calenderTodoObject.background = background
    }
    @action
    onChangeTitle = (e) => {
        let title = e.target.value
        this.calenderTodoObject.title = title
    }
    @action
    onChangeDescription = (e) => {
        let description = e.target.value 
        this.calenderTodoObject.description = description
    }
    @action
    toggleColorPicker = () => {
        this.showColorPicker = !this.showColorPicker
    }

    /* 캘린더 추가  */
    @action
    concatCalendar = async() => {
        let tempBackGround = this.calenderTodoObject.background
        let date = this.calenderTodoObject.date;
        let getCalenderResponse;
        try{ 
            const response = await calenderApi.insertCalenderTodo( this.calenderTodoObject )
            if(response.status == 200){
                toast.success('🦄 추가에 성공하였습니다!!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    });

                // getCalenderResponse = await calenderApi.getCalender( date );
                // console.log(getCalenderResponse)
            }
        }catch(e){
            toast.error('🦄 추가에 실패하였어요!!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                });
            console.log(e)
        }
        let formatDate = moment(date).format('YYYY-MM-DD')
        let calenderObjListClone = _.isNil(this.rootStore.calender.calenderObjectMap.get(formatDate) ) ? [] : this.rootStore.calender.calenderObjectMap.get(formatDate) 
        var calenderTodoObjectClone = Object.assign({}, (this.calenderTodoObject));
        calenderObjListClone.push(calenderTodoObjectClone);
        this.rootStore.calender.calenderObjectMap.set(formatDate, calenderObjListClone);

        this.calenderTodoObject = {
            date : date,
            background : tempBackGround,
            title : '',
            description : ''
        } //초기화
    }
 
}