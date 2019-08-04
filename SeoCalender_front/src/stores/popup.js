import { observable, action, computed } from 'mobx';
import _ from 'lodash'
export default class PopupStore{
    @observable color = ''
    @observable title = ''
    @observable background = 'red'
    @observable showTodoModal = false;
    @observable selectPopupDate = '';
    @observable showColorPicker = false;

    @action
    toggleCalenderTodoModal = (nowDate) => {
        this.selectPopupDate = nowDate;
        console.log("toggleCalenderTodoModal")
        this.showTodoModal = !this.showTodoModal
    }
    @action
    onChangeTitle = (title) => {
        this.title = title
    }

    @action
    toggleColorPicker = () => {
        this.showColorPicker = !this.showColorPicker
    }

    @action 
    setBackgroundColor = (color) => { 
        this.background = color.hex
    }
}