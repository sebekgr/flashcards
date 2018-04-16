import React, { Component } from 'react';
import {AppConsumer} from './StateContext';

class Home extends Component {

  loginUser(name){
    return (
      <div style={{marginRight: '20px'}}>
        <p>You are login</p>
        <p>Welcome {name}</p>
        <a href="/auth/logout">Log out</a>
      </div>
    )
  }
  logoutUser(){
    return (
      <div>
        <p>You are not login</p>
        <a href="/auth/google">Log in</a>
      </div>
    )
  }


  render() {
    
    const {userVal} = this.props;
    return (
        <div style={{padding: '20px',display: 'flex', alignItems: 'center'}}>
          {userVal ? this.loginUser(userVal.username) : this.logoutUser()}
        </div>
    );
  }
}

export default props => (
  <AppConsumer>
    {({userVal}) => <Home {...props} userVal={userVal}/>}
  </AppConsumer>
)

