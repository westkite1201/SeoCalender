
import TimerStore from './timer'
import CalenderStore from './calender'
class RootStore {
    constructor() {
      this.timer = new TimerStore(this);
      this.calender = new CalenderStore(this);
    }
  }
  
export default RootStore;