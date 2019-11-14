
import { observable, action } from "mobx";

class Common {
  @observable broadcaseWSUrl: string = '';

  @action
  setBroadcaseWSUrl(broadcaseWSUrl: string) {
    this.broadcaseWSUrl = broadcaseWSUrl;
  }
}

export default new Common();
