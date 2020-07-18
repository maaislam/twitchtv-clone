import React, { Component } from 'react';
import { connect } from 'react-redux'
import flv from 'flv.js'

import {  fetchSingleStream  } from '../../actions'



class StreamShow extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();  
    }

    componentDidMount() {
        console.log(this.myRef.current)
        this.props.fetchSingleStream(this.props.match.params.id);
        this.showVideo();


    };
    componentDidUpdate() {
        this.showVideo();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    showVideo = () => {

        if (this.player || !this.props.streamToShow){
            return;
        }

        this.player = flv.createPlayer({
            type:'flv',
            url: `http://localhost:8000/live/${this.props.match.params.id}.flv`
        }); 
        this.player.attachMediaElement(this.myRef.current);
        this.player.load();
    }

    renderStreamDetails = () => {
        if (this.props.streamToShow){
            const {title, description} = this.props.streamToShow;
            return (
                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <video ref = {this.myRef} style = {{width: '100%'}} controls/>
                {this.renderStreamDetails()}
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        streamToShow:state.streams.streamList[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps,{fetchSingleStream})(StreamShow);
