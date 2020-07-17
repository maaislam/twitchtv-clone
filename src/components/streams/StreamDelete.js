import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchSingleStream, deleteStream } from '../../actions'
import { Link } from 'react-router-dom'

import Modal from '../Modal'
import history from '../../history'

class StreamDelete extends Component {


    componentDidMount() {
        this.props.fetchSingleStream(this.props.match.params.id)
    }

    deleteStream = (e)=> {
        
        
        this.props.deleteStream(this.props.match.params.id)
    }
    renderActionBtns = () => {

        return (
            <React.Fragment>
                <button onClick = {this.deleteStream} className="ui negative button">Delete</button>
                <Link  to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );       
    };

 
    renderModal=() => {
        if (this.props.streamToDelete){
            return(

                    <Modal
                        header = "Delete Stream"
                        content = {`Are you sure you want to delete the stream with title: ${this.props.streamToDelete.title}`}
                        actions = {this.renderActionBtns()}
                        onDismiss = {() => history.push('/')}/>
                
            )
        }
    }


    render() {
        return (
            <>{this.renderModal()}</>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    if (state.streams.streamList){
        return {
            streamToDelete: state.streams.streamList[ownProps.match.params.id]
        }
    }
}

export default connect(mapStateToProps, {fetchSingleStream, deleteStream})(StreamDelete);
