import React, { Component } from 'react';

import { connect } from 'react-redux'

import {  signIn, signOut, openUserCard  } from '../actions'
import UserProfileCard from './UserProfileCard';





class GoogleAuth extends Component {



    componentDidMount(){

        /**
         * initiate google auth api
         */

        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId:'134024839870-iulf9vp6a3o9dkpbol7e0vlfpairva2r.apps.googleusercontent.com',
                scope:'profile email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                /**
                 * as the component lodas check if user is signed in or not & call appropritate action creator
                 */
                this.onAuthChange(this.auth.isSignedIn.get());
                /**
                 * keep listening for auth status change
                 */
                this.auth.isSignedIn.listen(this.onAuthChange);


            });
        });
        
    };

    /**
     * by default when passed into this.auth.isSignedIn.listen() get a boolean as parameter
     */
    onAuthChange = (isSignedIn) => {

      

        if (isSignedIn) {

            const signedUser = {
                fullName:this.auth.currentUser.get().getBasicProfile().getName(),
                userId: this.auth.currentUser.get().getId(),
                email:this.auth.currentUser.get().getBasicProfile().getEmail(),
                userImage:this.auth.currentUser.get().getBasicProfile().getImageUrl()
            }



            this.props.signIn(signedUser)
            //console.log(user);
        }else {
            this.props.signOut();
        }
    };
    /**
     * sign in button click handler
     */
    onSignInClick = () => {
        this.auth.signIn();
    };
    /**
     * sign out button click handler
     */
    onSignOutClick = () => {
        this.auth.signOut();
    };

    /*
     ***************************************************** 
     */
    onProfileImgClick = () => {
        this.props.openUserCard();
    };

    showUserCard = () => {
        if (this.props.userCardClick){
            return(
                <div>
                    <UserProfileCard 
                        userImage = {this.props.user.userImage}
                        fullName = {this.props.user.fullName}
                        email = {this.props.user.email}
                        onSignOutClick = {this.onSignOutClick}/>
                </div>
            )
        }
    };
    /**
     *****************************************************
     */
    /**
     * conditionally renders sign in/out button based on state isSignedIn
     */

    renderAuthButton= () => {

        if (this.props.isSignedIn===null) {
            return(
                <div>Checking Login Status</div>
            )
        }else if (this.props.isSignedIn) {
            return(
                <div>
                    <button onClick = {this.onProfileImgClick} className = "circular ui icon button" style = {{padding:'0'}}>
                        <img 
                            className = "ui mini circular image" 
                            src={this.props.user.userImage} 
                            alt={this.props.user.fullName}/>
                    </button> 
                  
                    {this.showUserCard()}
                </div>
               
            )
        }else {
            return (
                <button onClick = {this.onSignInClick} className="ui red google button">
                    <i className="icon google"/>Sign In with Google</button>
            )
        }
    };

    

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

    isSignedIn:state.auth.isSignedIn,
    user:state.auth.user,
    userCardClick:state.auth.userCard
});



export default connect(mapStateToProps,{signIn, signOut, openUserCard})(GoogleAuth);