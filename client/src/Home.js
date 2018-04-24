import React, { Component } from 'react';
import {AppConsumer} from './StateContext';
import { Icon} from 'antd';
class Home extends Component {

  loginUser(name){
    return (
      <div>
        <p>You are login</p>
        <p>Welcome <a href="/profile">{name}</a></p>
        <a href="/auth/logout">Log out</a>
      </div>
    )
  }
  logoutUser(){
    return (
      <div>
        <p>You are not login</p>
        
        <a href="/auth/google">Log in with <Icon type="google-plus" /></a>
      </div>
    )
  }


  render() {
    
    const {userVal} = this.props;
    return (
        <div>
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

