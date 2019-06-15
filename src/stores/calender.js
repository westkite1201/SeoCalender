import { observable, action, computed } from 'mobx';
import _ from 'lodash'
export default class CalenderStore{
    @observable year = ''
    @observable month = ''
    @observable selectedArr = [];
    @observable monthArray = [];
    @observable showPopup = false;
    @action
    setSelectedArr = (day) => {
        
    }

    @action
    togglePopup = () => {
        console.log("togglePopup ")
        let a = !this.showPopup;
        this.showPopup = a
    }
    @action
    closePopup = () => {
        
        console.log("togglePopup ")
        this.showPopup = false
        
    }
}