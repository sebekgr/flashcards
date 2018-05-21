import React, { Component } from 'react';
import {AppConsumer} from './StateContext';
import {Link} from 'react-router-dom';
import { Row, Col} from 'antd';
import {gridConfigContent} from './gridConfigContent';

class Home extends Component {

  render() {    
    const {userVal} = this.props;
    return (
        <Row justify="space-around" align="middle" style={{height: '100vh'}}>
          {userVal ? (
            <Col {...gridConfigContent} style={{textAlign: 'right'}}>
              <Link className="ant-btn" to='/profile'>Profile</Link>
              <a className="ant-btn" href="/auth/logout">Logout</a> 
            </Col>): null }
            <Col {...gridConfigContent}>
              <h1 className="heading-welcome">Flashcards</h1>
              <p className="description-welcome">
                Welcome to place where you can simply create very own flashcards.
                Improve your skills and knowledge now!
              </p>
              <a className="ant-btn ant-btn-primary" href="/auth/google">Get Started</a>
              <a className="ant-btn" href="https://github.com/sebekgr/flashcards">Source code</a>
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

//{userVal ? this.loginUser(userVal.username) : this.logoutUser()}

