import { observable, action, computed } from 'mobx';
import _ from 'lodash'
export default class CalenderStore{
    @observable color = ''
    @observable title = ''

    @action
    select = (title) => {
        this.title = title
    }

    @action
    toggleColorPicker = () => {

    }
    @action
    selectColor = () => {

    }
}