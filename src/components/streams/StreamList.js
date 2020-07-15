import React, { Component } from 'react'
import { connect } from 'react-redux'

import {fetchAllStream} from '../../actions'
import { Link } from 'react-router-dom'

export class StreamList extends Component {
    
    componentDidMount(){

        this.props.fetchAllStream()
    };
    


    renderEditDelBtn = (stream) => {
        if (stream.userId===this.props.currentUserId){
            return(
                <div className="right floated content">
                    <button className="ui button primary">
                        Edit
                    </button>
                    <button className="ui button negative">
                        Delete
                    </button>
                </div>
            )
        }

    }

    renderList = () => {

        return this.props.streams.map(stream => {
            return (
                <div className="item" key = {stream.id}>
                {this.renderEditDelBtn(stream)}
                    <i className="large middle aligned icon video"/>
                    <div className="content">
                        <div className="header">{stream.title}</div>
                        <div className="description">
                        {stream.description}
                        </div>
                    </div>
                    
                </div>
            )
        })


    };

    renderCreateStreamBtn = () => {
        if(this.props.isSignedIn){
            return(
                <div className = "right floated content" style ={{textAlign:'right'}}>
                    <Link to = "/streams/new" className = "ui button primary">
                        Create New Stream
                    </Link>
                </div>
            )
        }

    };

    render() {
        //console.log(this.props.streams)
        return (
            <div>
                <div className = "ui celled list">
                    {this.renderList()}
                    
                </div>
                {this.renderCreateStreamBtn()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
   
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn:state.auth.isSignedIn 

})



export default connect(mapStateToProps, {fetchAllStream})(StreamList)
