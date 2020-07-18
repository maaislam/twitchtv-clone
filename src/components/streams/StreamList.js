import React, { Component } from 'react'
import { connect } from 'react-redux'

import {fetchAllStream} from '../../actions'
import { Link } from 'react-router-dom'

import Loader from '../Loader'

export class StreamList extends Component {
    
    componentDidMount(){
        /**
         ** calling action creator to fetch all streams
         */
        this.props.fetchAllStream()
    };
    
    /**
     *
     */

    /**
     ** conditionally render edit and delete buttons i.e. 
     ** if there is a valid userId and if userId stored in streams is equal to current logged in userId. 
     ** current userId is derived from google auth api see onAuthChange method in GoogleAuth component.
     ** This method is invoked in renderList method.
     */
    renderEditDelBtn = (stream) => {
        if (stream.userId && stream.userId===this.props.currentUserId){
            return(
                <div className="right floated content">
                    <Link to = {`/streams/edit/${stream.id}`} className="ui button primary">
                        Edit
                    </Link>
                    <Link to = {`streams/delete/${stream.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            )
        }

    }
    /**
     ** iterate over streams array. Note it has been converted to array from object in mapStateToProps function. 
     */
    renderList = () => {
        if (this.props.streams){
            return this.props.streams.map(stream => {
                return (
                    <div className="item" key = {stream.id}>
                    {this.renderEditDelBtn(stream)}
                        <i className="large middle aligned icon video"/>
                        <div className="content">
                            <Link to= {`streams/${stream.id}`} className="header">{stream.title}</Link>
                            <div className="description">
                            {stream.description}
                            </div>
                        </div>
                        
                    </div>
                )
            })
        }

    };
    /**
     ** this button routes user to createStream page and is only shown if user is signed in.
     */
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
    
    /*
     * this method ensures a loader is shown if isFetching is true and if false it shows the list of streams by calling the renderList method.
     */
    
    
    

    renderLoaderOrList = () => {

        if (this.props.isFetching){
            return(
                <div>
                    <Loader className= "item" count = {10}/>
                   
                </div>
                
            )
        }else if (!this.props.isFetching){
            return(
                <div className = "ui celled list">
                    <h1>All Streams</h1>
                    {this.renderList()}
                </div>
                
            )
        }
    };

    render() {
        
        return (
            <div>
                
                {this.renderLoaderOrList()}
    
                {this.renderCreateStreamBtn()}
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
   
    streams: Object.values(state.streams.streamList),
    isFetching:state.streams.isFetching,
    currentUserId: state.auth.user.userId,
    isSignedIn:state.auth.isSignedIn,
    
    

})



export default connect(mapStateToProps, {fetchAllStream})(StreamList)
