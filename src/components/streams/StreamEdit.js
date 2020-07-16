import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchSingleStream } from '../../actions'


class StreamEdit extends Component {

    componentDidMount() {
        /**
         * *calling fetch single stream so when user manually navigate to this page props has the right stream. 
         * *Also a good practice to ensure router component get its own data
         */
        this.props.fetchSingleStream(this.props.match.params.id);
    }

    renderStreamToEdit = () => {
        if (this.props.streamToEdit) {
            return(
                <div>
                   <h4>{this.props.streamToEdit.title}</h4>
                   <h5>{this.props.streamToEdit.description}</h5>
                   <p>Stream ID: {this.props.streamToEdit.id}</p>

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

export default connect(mapStateToProps,{  fetchSingleStream  })(StreamEdit);
