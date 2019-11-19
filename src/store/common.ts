
import { observable, action } from "mobx";

class Common {
  @observable broadcaseWSUrl: string = '';
  @observable panel: boolean = false;

  @action
  setBroadcaseWSUrl(broadcaseWSUrl: string) {
    this.broadcaseWSUrl = broadcaseWSUrl;
  }
  @action togglePanel () {
    this.panel = !this.panel
  }
}

export default new Common();
