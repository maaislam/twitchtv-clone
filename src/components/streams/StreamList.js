import React, { Component } from 'react'
import { connect } from 'react-redux'

import {fetchAllStream} from '../../actions'
import { Link } from 'react-router-dom'

import Loader from '../Loader'

export class StreamList extends Component {
    
    componentDidMount(){

        this.props.fetchAllStream()
    };
    


    renderEditDelBtn = (stream) => {
        if (stream.userId && stream.userId===this.props.currentUserId){
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
        if (this.props.streams){
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
        }

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
                    {this.renderList()}
                </div>
                
            )
        }
    };

    render() {
        //console.log(this.props.streams)
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
    isSignedIn:state.auth.isSignedIn
    

})



export default connect(mapStateToProps, {fetchAllStream})(StreamList)
