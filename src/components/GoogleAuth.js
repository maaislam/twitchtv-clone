import React, { Component } from 'react';

class GoogleAuth extends Component {


    state = {
        isSighedIn:null
    }

    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId:'134024839870-iulf9vp6a3o9dkpbol7e0vlfpairva2r.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(()=>{
                    this.setState({isSignedIn:this.auth.isSignedIn.get()    });
                });
            });
        });
        
    };

    renderAuthButton= () => {

        if (this.state.isSignedIn===null) {
            return(
                <div></div>
            )
        }else if (this.state.isSignedIn) {
            return(
                <button onClick = {this.onSignOutClick} className="ui red google button">
                    <i className="icon google"/> Sign Out</button>
            )
        }else {
            return (
                <button onClick = {this.onSignInClick} className="ui red google button">
                    <i className="icon google"/>Sign In</button>
            )
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

export default GoogleAuth;