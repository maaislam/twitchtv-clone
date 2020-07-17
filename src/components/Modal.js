import React from 'react';
import ReactDOM from 'react-dom'



const Modal = (props) => {
    return  ReactDOM.createPortal (
        <div className = "ui dimmer visible active" onClick = {props.onDismiss}>
            <div className="ui standard modal visible active" onClick = {(e) => e.stopPropagation() }>
                <div className="header">{props.header}</div>
                <div className="content">{props.content}</div>
                <div className="actions">
                   {props.actions} {/*place a div with button here*/}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
}

export default Modal;
 