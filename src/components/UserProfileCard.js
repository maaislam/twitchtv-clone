import React, { Component } from 'react';

import { connect } from 'react-redux'

import  './UserProfileCard.css'

class UserProfileCard extends Component {


    onSignOutClick = () => {
        this.props.onSignOutClick()
    }

   


    render() {
        return (
            <div className={`ui card profile_card ${this.props.userCard?"fade-in":"fade-out"}`}>
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



export default connect(mapStateToProps)(UserProfileCard);
