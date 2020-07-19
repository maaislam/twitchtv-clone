import React, { Component } from 'react';

import { connect } from 'react-redux'

import {  openUserCard  } from '../actions'
import  './UserProfileCard.css'

class UserProfileCard extends Component {

    constructor(props) {
        super(props);

        this.profileCardRef = React.createRef();
        
    }
   

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.profileCardRef && !this.profileCardRef.current.contains(event.target) && this.props.userCard) {
            //alert('You clicked outside of me!');

            this.props.openUserCard();
        }
    }

    onSignOutClick = () => {
            this.props.onSignOutClick()
        }

    render() {
        return (
           
                <div ref = {this.profileCardRef} className="ui card profile_card">
                    <div>
                        <img className = "ui small circular image" src={this.props.userImage} alt={this.props.fullName}/>
                    </div>
                    <div className="content">
                        <div className="center aligned header">{this.props.fullName}</div>
                        
                        <div className=" center aligned description">
                        {this.props.email}  
                        </div>
                    </div>
                    <div className=" center aligned extra content">
                    <button onClick = {this.onSignOutClick} className="ui red google button">
                            <i className="icon google"/>Sign Out</button>
                    </div>
                </div>
          
        );
    }
}

const mapStateToProps = (state) => ({

    userCard:state.auth.userCard
});



export default connect(mapStateToProps, {openUserCard}) (UserProfileCard);
