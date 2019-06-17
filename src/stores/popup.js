import { observable, action, computed } from 'mobx';
import _ from 'lodash'
export default class CalenderStore{
    @observable color = ''
    @observable title = ''

    @action
    onChangeTitle = (title) => {
        this.title = title
    }

    @action
    toggleColorPicker = () => {

    }
    @action
    selectColor = () => {

    }
}