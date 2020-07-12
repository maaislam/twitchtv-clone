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
                <div></div>
            )
        }else {
            return (
                <div></div>
            )
        }
    };

    render() {
        return (
            <div>
                GoogleAuth
            </div>
        );
    }
}

export default GoogleAuth;