import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import './index.styl';

interface Props {
  isShowMask?: boolean;
  isShow: boolean;
  width?: string;
  height?: string;
  isHideBtnClose?: boolean;
  onCloseHandler?: () => void;
}

let zIndex = 10;
let MODAL_ROOT_CLASS = 'modal-root-c';
let DEFAULT_WIDTH = '5rem';
let DEFAULT_HEIGHT = '5rem';

class BaseModal extends PureComponent<Props, object> {
  modalContainer: HTMLDivElement;
  constructor(props: Props) {
    super(props);
    this.modalContainer = document.createElement('div');
    this.modalContainer.className = MODAL_ROOT_CLASS;
    this.modalContainer.style.zIndex = String(this.genZindex());
  }
  genZindex() {
    return zIndex++;
  }
  componentDidMount() {
    document.body.appendChild(this.modalContainer);
  }
  componentWillUnmount() {
    document.body.removeChild(this.modalContainer);
  }
  onCloseHandler = () => {
    if (this.props.onCloseHandler) {
      this.props.onCloseHandler();
    }
  }
  render() {
    this.modalContainer.style.display = this.props.isShow ? 'block' : 'none';
    let elements = (<div className="base-modal-view">
      <div className={`base-modal-mask ${this.props.isShowMask === false ? 'hide' : ''}`}></div>
      <div className={`content-wp`} style={{minWidth: this.props.width || DEFAULT_WIDTH, minHeight: this.props.height || DEFAULT_HEIGHT}}>
        {!this.props.isHideBtnClose && <div className="crs-p icon-cross btn-close" onClick={this.onCloseHandler}></div>}
        {this.props.children}
      </div>
    </div>);
    return ReactDOM.createPortal(elements, this.modalContainer);
  }
}

export default BaseModal;
