import React, { Component } from 'react';

import { connect } from 'react-redux'

import {  signIn, signOut  } from '../actions'





class GoogleAuth extends Component {



    componentDidMount(){

        /**
         * initiate google auth api
         */

        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId:'134024839870-iulf9vp6a3o9dkpbol7e0vlfpairva2r.apps.googleusercontent.com',
                scope:'email'
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
            this.props.signIn(this.auth.currentUser.get().getId())
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
                <button onClick = {this.onSignOutClick} className="ui red google button">
                    <i className="icon google"/> Sign Out</button>
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

    isSignedIn:state.auth.isSignedIn
});



export default connect(mapStateToProps,{signIn, signOut})(GoogleAuth);