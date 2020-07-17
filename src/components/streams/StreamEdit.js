import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchSingleStream, editStream } from '../../actions'
import StreamForm from './StreamForm';


class StreamEdit extends Component {

    componentDidMount() {
        /**
         * *calling fetch single stream so when user manually navigate to this page props has the right stream. 
         * *Also a good practice to ensure router component get its own data
         */
        this.props.fetchSingleStream(this.props.match.params.id);
    }


    onSubmit = (formValues) => {
        this.props.editStream(this.props.match.params.id, formValues)
    }

    renderStreamToEdit = () => {
        if (this.props.streamToEdit) {
            /**
             * *destruct this,props.streaToEdit and pick out tile and description
             * *never pass whole object to put request.
             */
            const {title, description} = this.props.streamToEdit;
            return(
                <div>
                    <h3>Edit Stream</h3>
                    <StreamForm 
                        initialValues = {{title, description}}
                        onSubmit = {this.onSubmit}/>
                </div>
            )
        }
    };

    render() {
        return (
            <div>
                {this.renderStreamToEdit()}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    
    return {
        streamToEdit: state.streams.streamList[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps,{  fetchSingleStream, editStream  })(StreamEdit);
