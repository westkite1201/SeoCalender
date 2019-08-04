
import TimerStore from './timer'
import CalenderStore from './calender'
import PopupStore from './popup'
class RootStore {
    constructor() {
      this.popup = new PopupStore(this);
      this.timer = new TimerStore(this);
      this.calender = new CalenderStore(this);
    }
  }
  
export default RootStore;