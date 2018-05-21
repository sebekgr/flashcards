import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from './Home';
import Profile from './Profile/Profile'
import LearningCard from './Learning/LearningCard';
import ProfileEdit from './Profile/ProfileEdit';
import AddNew from './flashcards/AddNew';
import CategoryList from './Profile/CategoryList';
import SearchFlashcards from './flashcards/SearchFlashcards';
import { Row, Col } from 'antd';
import {AppConsumer} from './StateContext';

const PrivateRoute = ({auth, component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
      auth ? <Component {...props} /> :
      <Redirect to={{
          pathname: '/',
          from: props.location.pathname
      }} />
  )}
  />
);


class App extends Component {

  render() {
    const {userVal} = this.props;
    return (
      <Row>
      <Col>
       <Router>
         <Fragment>
                <Route exact path="/" component={Home} />
                <PrivateRoute auth={userVal} path="/profile" component={Profile} />
                <PrivateRoute auth={userVal} path="/profile/edit" component={ProfileEdit} />
                <PrivateRoute auth={userVal} path="/profile/add" component={AddNew} />
                <PrivateRoute auth={userVal} path="/profile/categorylist" component={CategoryList} />
                <PrivateRoute auth={userVal} path="/profile/search" component={SearchFlashcards} />
                <PrivateRoute auth={userVal} exact path="/learning" component={LearningCard} />
          </Fragment>
        </Router>
      </Col>
    </Row>
        
    );
  }
}

export default props => (
  <AppConsumer>
    {({userVal}) => <App {...props} userVal={userVal}/>}
  </AppConsumer>
)
