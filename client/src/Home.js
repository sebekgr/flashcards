import React, { Component } from 'react';
import {AppConsumer} from './StateContext';
import {Link} from 'react-router-dom';
import { Icon, Row, Col} from 'antd';
import {gridConfigContent} from './gridConfigContent';
class Home extends Component {

  loginUser(name){
    return (
      <div>
        <p>You are login</p>
        <p>Welcome <Link to='/profile'>{name}</Link></p>
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
        <Row type="flex" justify="center" align="middle" >
          <Col>
          {userVal ? this.loginUser(userVal.username) : this.logoutUser()}
          </Col>
        </Row>
    );
  }
}

export default props => (
  <AppConsumer>
    {({userVal}) => <Home {...props} userVal={userVal}/>}
  </AppConsumer>
)

