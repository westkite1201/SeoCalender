import TimerStore from './timer';
import CalenderStore from './calender';
import PopupStore from './popup';
import webpushStore from './webpush';
class RootStore {
  constructor() {
    this.popup = new PopupStore(this);
    this.timer = new TimerStore(this);
    this.calender = new CalenderStore(this);
    this.webpush = new webpushStore(this);
  }
}

export default RootStore;
